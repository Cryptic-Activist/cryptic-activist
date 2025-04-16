// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Escrow
 * @notice A robust escrow contract for a crypto trading platform.
 *
 * This contract is deployed only once and reused for each trade. For each new trade,
 * the owner initializes trade-specific parameters via initTrade(), dynamically setting:
 *   - Buyer, Seller, and arbitrator addresses.
 *   - Trade amounts (cryptoAmount, buyerCollateral, and sellerCollateral).
 *   - Duration parameters (deposit duration, confirmation duration, dispute timeout).
 *   - Fee parameters (fee rate in basis points, platform wallet, and an additional profitMargin).
 *
 * In this design:
 *  - The seller must deposit: cryptoAmount + sellerCollateral + feeTotal,
 *    where feeTotal = (cryptoAmount * feeRate/10000) + profitMargin.
 *  - The buyer deposits buyerCollateral.
 *
 * Upon a successful trade release:
 *  - The buyer receives their full collateral back, plus the full cryptoAmount.
 *    (Thus, their balance increases by exactly cryptoAmount.)
 *  - The platform receives feeTotal.
 *  - The seller receives only their sellerCollateral.
 *
 * This means that the seller effectively pays the trade value plus fees, and the buyer’s net gain is the full trade amount.
 */
contract Escrow is Ownable {
    // Dynamic trade participants and parameters (set during trade initialization)
    address payable public buyer;
    address payable public seller;
    address public arbitrator;
    address public platformWallet;
    uint256 public feeRate; // in basis points, e.g., 50 means 0.5%
    
    // Additional profit margin (in wei) collected from the seller's deposit.
    uint256 public profitMargin;

    // Trade amounts (in wei) for the current trade.
    uint256 public cryptoAmount;      // The crypto trade value (intended for buyer)
    uint256 public buyerCollateral;   // The buyer's collateral deposit.
    uint256 public sellerCollateral;  // The seller's collateral deposit.

    // Trade-specific deadlines.
    uint256 public depositDeadline;
    uint256 public confirmationDeadline;
    uint256 public confirmationDuration;   // Duration for fiat confirmations after deposits.
    uint256 public disputeTimeout;         // Duration within which the arbitrator must resolve a dispute.

    // Flags indicating state of deposits and confirmations.
    bool public buyerDeposited;
    bool public sellerDeposited;
    bool public fiatSentConfirmed;
    bool public fiatReceivedConfirmed;

    // Reentrancy lock.
    bool private locked;
    modifier nonReentrant() {
        require(!locked, "Reentrancy not allowed");
        locked = true;
        _;
        locked = false;
    }

    // Trade state.
    enum State { 
        AWAITING_TRADE_INIT, // No active trade.
        AWAITING_DEPOSITS, 
        AWAITING_CONFIRMATIONS, 
        DISPUTED, 
        COMPLETE, 
        CANCELLED 
    }
    State public tradeState;

    // Dispute resolution variable.
    uint256 public disputeRaisedAt; // Timestamp when dispute was raised.

    // Events.
    event TradeInitialized(
        address buyer, 
        address seller, 
        address arbitrator,
        uint256 depositDeadline, 
        uint256 confirmationDuration,
        uint256 disputeTimeout,
        uint256 feeRate,
        address platformWallet,
        uint256 profitMargin
    );
    event Deposited(address indexed party, uint256 amount);
    event FiatSentConfirmed(address indexed buyer);
    event FiatReceivedConfirmed(address indexed seller);
    event TradeReleased(uint256 cryptoTransferred, uint256 buyerRefund, uint256 sellerRefund);
    event TradeCancelled();
    event DisputeRaised();
    // penalizedParty: 0 = none, 1 = buyer penalized, 2 = seller penalized.
    event DisputeResolved(bool tradeReleased, uint8 penalizedParty);
    event DisputeEscalated();
    event ArbitratorUpdated(address oldArbitrator, address newArbitrator);
    event FeeUpdated(uint256 newFeeRate, address newPlatformWallet);

    /**
     * @notice Constructor initializes the Ownable base.
     * Initially, no trade is active.
     */
    constructor() Ownable(msg.sender) {
        tradeState = State.AWAITING_TRADE_INIT;
    }

    /**
     * @notice Allows the owner to update the arbitrator during an active trade.
     * @param _newArbitrator The new arbitrator address.
     */
    function updateArbitrator(address _newArbitrator) external onlyOwner {
        address old = arbitrator;
        arbitrator = _newArbitrator;
        emit ArbitratorUpdated(old, _newArbitrator);
    }

    /**
     * @notice Allows the owner to update fee parameters outside of trade initialization.
     * @param _feeRate The new fee rate in basis points.
     * @param _platformWallet The new platform wallet address.
     */
    function setFeeAndWallet(uint256 _feeRate, address _platformWallet) external onlyOwner {
        feeRate = _feeRate;
        platformWallet = _platformWallet;
        emit FeeUpdated(_feeRate, _platformWallet);
    }

    /**
     * @notice Initializes a new trade with dynamic parameters.
     *
     * Requirements:
     *   - Only the owner may call this.
     *   - No trade is currently active (previous trade is COMPLETE, CANCELLED, or not yet initialized).
     *   - Note: The seller must eventually deposit (cryptoAmount + sellerCollateral + feeTotal),
     *           where feeTotal = (cryptoAmount * feeRate/10000) + profitMargin.
     *
     * @param _buyer The crypto buyer for this trade.
     * @param _seller The crypto seller for this trade.
     * @param _arbitrator The arbitrator for this trade.
     * @param _cryptoAmount The trade value (in wei) that the seller provides for the buyer.
     * @param _buyerCollateral The buyer's collateral (in wei).
     * @param _sellerCollateral The seller's collateral (in wei).
     * @param depositDuration Duration (in seconds) until deposits must be complete.
     * @param _confirmationDuration Duration (in seconds) for fiat confirmations after deposits.
     * @param _disputeTimeout Duration (in seconds) for arbitrator dispute resolution.
     * @param _feeRate The fee rate (in basis points) to apply to cryptoAmount.
     * @param _platformWallet The platform wallet address for fee collection.
     * @param _profitMargin The additional profit margin (in wei) to be collected from the seller.
     */
    function initTrade(
        address payable _buyer,
        address payable _seller,
        address _arbitrator,
        uint256 _cryptoAmount,
        uint256 _buyerCollateral,
        uint256 _sellerCollateral,
        uint256 depositDuration,
        uint256 _confirmationDuration,
        uint256 _disputeTimeout,
        uint256 _feeRate,
        address _platformWallet,
        uint256 _profitMargin
    ) external onlyOwner {
        require(
            tradeState == State.COMPLETE ||
            tradeState == State.CANCELLED ||
            tradeState == State.AWAITING_TRADE_INIT,
            "Existing trade in progress"
        );
        // (Assume buyerCollateral is validated externally to cover any margin if needed.)
        buyer = _buyer;
        seller = _seller;
        arbitrator = _arbitrator;
        cryptoAmount = _cryptoAmount;
        buyerCollateral = _buyerCollateral;
        sellerCollateral = _sellerCollateral;
        depositDeadline = block.timestamp + depositDuration;
        confirmationDuration = _confirmationDuration;
        disputeTimeout = _disputeTimeout;
        feeRate = _feeRate;
        platformWallet = _platformWallet;
        profitMargin = _profitMargin;
        // Reset trade flags.
        buyerDeposited = false;
        sellerDeposited = false;
        fiatSentConfirmed = false;
        fiatReceivedConfirmed = false;
        tradeState = State.AWAITING_DEPOSITS;
        emit TradeInitialized(_buyer, _seller, _arbitrator, depositDeadline, _confirmationDuration, _disputeTimeout, _feeRate, _platformWallet, _profitMargin);
    }

    /**
     * @notice Buyer deposits his collateral.
     */
    function depositByBuyer() external payable nonReentrant {
        require(tradeState == State.AWAITING_DEPOSITS, "Deposits not allowed");
        require(block.timestamp <= depositDeadline, "Deposit deadline passed");
        require(msg.sender == buyer, "Only buyer can deposit");
        require(!buyerDeposited, "Buyer already deposited");
        require(msg.value == buyerCollateral, "Incorrect buyer collateral amount");

        buyerDeposited = true;
        emit Deposited(buyer, msg.value);
        _checkDepositsComplete();
    }

    /**
     * @notice Seller deposits the crypto amount plus his collateral plus fee & profit.
     * The seller must deposit: cryptoAmount + sellerCollateral + feeTotal,
     * where feeTotal = (cryptoAmount * feeRate / 10000) + profitMargin.
     */
    function depositBySeller() external payable nonReentrant {
        require(tradeState == State.AWAITING_DEPOSITS, "Deposits not allowed");
        require(block.timestamp <= depositDeadline, "Deposit deadline passed");
        require(msg.sender == seller, "Only seller can deposit");
        require(!sellerDeposited, "Seller already deposited");
        uint256 fee = (cryptoAmount * feeRate) / 10000;
        uint256 feeTotal = fee + profitMargin;
        uint256 requiredValue = cryptoAmount + sellerCollateral + feeTotal;
        require(msg.value == requiredValue, "Incorrect seller deposit amount");
        
        sellerDeposited = true;
        emit Deposited(seller, msg.value);
        _checkDepositsComplete();
    }

    /**
     * @dev Internal function to check if both deposits are complete.
     */
    function _checkDepositsComplete() internal {
        if (buyerDeposited && sellerDeposited) {
            tradeState = State.AWAITING_CONFIRMATIONS;
            confirmationDeadline = block.timestamp + confirmationDuration;
        }
    }

    /**
     * @notice Buyer confirms that fiat has been sent off-chain.
     */
    function confirmFiatSent() external nonReentrant {
        require(tradeState == State.AWAITING_CONFIRMATIONS, "Not in confirmation phase");
        require(msg.sender == buyer, "Only buyer can confirm fiat sent");
        require(!fiatSentConfirmed, "Fiat already confirmed");
        fiatSentConfirmed = true;
        emit FiatSentConfirmed(buyer);
    }

    /**
     * @notice Seller confirms that fiat has been received off-chain.
     */
    function confirmFiatReceived() external nonReentrant {
        require(tradeState == State.AWAITING_CONFIRMATIONS, "Not in confirmation phase");
        require(msg.sender == seller, "Only seller can confirm fiat received");
        require(!fiatReceivedConfirmed, "Fiat already confirmed");
        fiatReceivedConfirmed = true;
        emit FiatReceivedConfirmed(seller);
    }

    /**
     * @notice Releases the trade under normal conditions.
     *
     * Transfer outcomes:
     * - Buyer receives: their full buyerCollateral refund plus the entire cryptoAmount.
     *   (This means their wallet increases by exactly cryptoAmount.)
     * - Platform receives: feeTotal = (cryptoAmount * feeRate/10000) + profitMargin.
     * - Seller receives: only their sellerCollateral refund.
     *
     * Note: The cryptoAmount comes from the seller's deposit.
     */
    function releaseTrade() external nonReentrant {
        require(tradeState == State.AWAITING_CONFIRMATIONS, "Trade not in confirmation phase");
        require(msg.sender == seller, "Only seller can release trade");
        require(fiatSentConfirmed && fiatReceivedConfirmed, "Fiat confirmations incomplete");
        
        tradeState = State.COMPLETE;
        uint256 fee = (cryptoAmount * feeRate) / 10000;
        uint256 feeTotal = fee + profitMargin;
        
        // Expect contract balance to be exactly: 
        // buyerCollateral + cryptoAmount + sellerCollateral + feeTotal.
        uint256 expectedBalance = buyerCollateral + cryptoAmount + sellerCollateral + feeTotal;
        require(address(this).balance >= expectedBalance, "Insufficient contract balance");

        // Execute transfers:
        // 1. Refund buyer's collateral.
        (bool refundBuyer, ) = buyer.call{value: buyerCollateral}("");
        require(refundBuyer, "Refund to buyer failed");
        // 2. Transfer trade amount (cryptoAmount) to buyer.
        (bool sendToBuyer, ) = buyer.call{value: cryptoAmount}("");
        require(sendToBuyer, "Transfer of trade amount to buyer failed");
        // 3. Transfer fee+profitMargin to platform.
        (bool sendToPlatform, ) = platformWallet.call{value: feeTotal}("");
        require(sendToPlatform, "Transfer to platform failed");
        // 4. Refund seller's collateral.
        (bool refundSeller, ) = seller.call{value: sellerCollateral}("");
        require(refundSeller, "Refund to seller failed");

        // Clear deposit flags.
        buyerDeposited = false;
        sellerDeposited = false;

        emit TradeReleased(cryptoAmount, buyerCollateral, sellerCollateral);
    }

    /**
     * @notice Cancels the trade if deadlines are exceeded, refunding deposits in full.
     */
    function cancelTrade() public nonReentrant {
        require(
            tradeState == State.AWAITING_DEPOSITS || tradeState == State.AWAITING_CONFIRMATIONS,
            "Cannot cancel now"
        );
        if (tradeState == State.AWAITING_DEPOSITS) {
            require(block.timestamp > depositDeadline, "Deposit deadline not reached");
        } else if (tradeState == State.AWAITING_CONFIRMATIONS) {
            require(block.timestamp > confirmationDeadline, "Confirmation deadline not reached");
        }
        tradeState = State.CANCELLED;
        
        // Refund buyer's collateral.
        if (buyerDeposited) {
            (bool refundBuyer, ) = buyer.call{value: buyerCollateral}("");
            require(refundBuyer, "Refund to buyer failed");
            buyerDeposited = false;
        }
        // Refund seller's full deposit.
        if (sellerDeposited) {
            uint256 fee = (cryptoAmount * feeRate) / 10000;
            uint256 feeTotal = fee + profitMargin;
            uint256 refundSeller = cryptoAmount + sellerCollateral + feeTotal;
            (bool refundSellerSent, ) = seller.call{value: refundSeller}("");
            require(refundSellerSent, "Refund to seller failed");
            sellerDeposited = false;
        }
        emit TradeCancelled();
    }

    /**
     * @notice Either party may raise a dispute if the confirmation deadline is exceeded.
     */
    function raiseDispute() external nonReentrant {
        require(tradeState == State.AWAITING_CONFIRMATIONS, "Dispute not allowed in current state");
        require(block.timestamp > confirmationDeadline, "Confirmation deadline not reached");
        tradeState = State.DISPUTED;
        disputeRaisedAt = block.timestamp;
        emit DisputeRaised();
    }

    /**
     * @notice Escalates an unresolved dispute; callable by owner after dispute timeout expires.
     */
    function escalateDispute() external onlyOwner nonReentrant {
        require(tradeState == State.DISPUTED, "No active dispute");
        require(block.timestamp > disputeRaisedAt + disputeTimeout, "Dispute timeout not reached");
        tradeState = State.CANCELLED;
        // Refund buyer's collateral.
        if (buyerDeposited) {
            (bool refundBuyer, ) = buyer.call{value: buyerCollateral}("");
            require(refundBuyer, "Refund to buyer failed");
            buyerDeposited = false;
        }
        // Refund seller's deposit in full.
        if (sellerDeposited) {
            uint256 fee = (cryptoAmount * feeRate) / 10000;
            uint256 feeTotal = fee + profitMargin;
            uint256 refundSeller = cryptoAmount + sellerCollateral + feeTotal;
            (bool refundSellerSent, ) = seller.call{value: refundSeller}("");
            require(refundSellerSent, "Refund to seller failed");
            sellerDeposited = false;
        }
        emit DisputeEscalated();
    }

    /**
     * @notice The arbitrator resolves a dispute.
     * @param decision If true, trade is released (fee and profit applied); if false, trade is cancelled.
     * @param penalizedParty Indicates which party is penalized (0: none, 1: buyer, 2: seller).
     */
    function resolveDispute(bool decision, uint8 penalizedParty) external nonReentrant {
        require(tradeState == State.DISPUTED, "No dispute to resolve");
        require(msg.sender == arbitrator, "Only arbitrator can resolve dispute");
        require(penalizedParty <= 2, "Invalid penalty option");

        uint256 buyerAmount;
        uint256 sellerAmount;
        uint256 fee = (cryptoAmount * feeRate) / 10000;
        uint256 feeTotal = fee + profitMargin;
        
        if (decision) {
            if (penalizedParty == 1) {
                // Buyer penalized: forfeits buyerCollateral.
                buyerAmount = cryptoAmount;
                sellerAmount = sellerCollateral + buyerCollateral;
            } else if (penalizedParty == 2) {
                // Seller penalized: forfeits sellerCollateral.
                buyerAmount = cryptoAmount;
                sellerAmount = 0;
            } else {
                // Normal release.
                buyerAmount = cryptoAmount;
                sellerAmount = sellerCollateral;
            }
            // Process transfers for a normal release.
            (bool refundBuyer, ) = buyer.call{value: buyerCollateral}("");
            require(refundBuyer, "Refund to buyer failed");
            (bool sendBuyer, ) = buyer.call{value: buyerAmount}("");
            require(sendBuyer, "Transfer to buyer failed");
            (bool sendPlatform, ) = platformWallet.call{value: feeTotal}("");
            require(sendPlatform, "Transfer to platform failed");
            (bool refundSeller, ) = seller.call{value: sellerCollateral}("");
            require(refundSeller, "Refund to seller failed");
        } else {
            // Trade cancelled: refund in full.
            if (penalizedParty == 1) {
                buyerAmount = 0;
                sellerAmount = cryptoAmount + sellerCollateral + buyerCollateral;
            } else if (penalizedParty == 2) {
                buyerAmount = cryptoAmount + sellerCollateral + buyerCollateral;
                sellerAmount = 0;
            } else {
                buyerAmount = buyerCollateral;
                sellerAmount = cryptoAmount + sellerCollateral;
            }
            if (buyerAmount > 0) {
                (bool refundBuyer, ) = buyer.call{value: buyerAmount}("");
                require(refundBuyer, "Refund to buyer failed");
            }
            if (sellerAmount > 0) {
                (bool refundSeller, ) = seller.call{value: sellerAmount}("");
                require(refundSeller, "Refund to seller failed");
            }
        }
        
        tradeState = State.COMPLETE;
        buyerDeposited = false;
        sellerDeposited = false;

        emit DisputeResolved(decision, penalizedParty);
    }

    // Returns the basic trade details.
    function getTradeBasicDetails() external view returns (
        // address _buyer,
        // address _seller,
        // address _arbitrator,
        uint256 _cryptoAmount
        // uint256 _buyerCollateral,
        // uint256 _sellerCollateral
    ) {
        return (
            // buyer,
            // seller,
            // arbitrator,
            cryptoAmount
            // buyerCollateral,
            // sellerCollateral
        );
    }
}
