// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Escrow
 * @notice A robust escrow contract for a crypto trading platform.
 *
 * This contract is deployed only once and reused for each trade. For each new trade,
 * the owner initializes trade-specific parameters via initTrade(), dynamically setting:
 *   - Buyer, Seller, and arbitrator addresses.
 *   - Trade amounts (crypto amount, buyer collateral, and seller collateral).
 *   - Duration parameters (deposit duration, confirmation duration, dispute timeout).
 *   - Fee parameters (fee rate in basis points and platform wallet).
 *
 * Features:
 *  - Buyer and Seller deposits with collateral, with deposit and confirmation deadlines.
 *  - Off-chain fiat payment confirmations.
 *  - Timeout mechanism: if deposits or confirmations are not received on time, the trade may be cancelled.
 *  - Dispute resolution process, with a dispute timeout and escalation option.
 *  - Reentrancy protection using a simple lock.
 *  - Trading fee: A dynamic fee deducted from the crypto amount is sent to a platform wallet upon trade release.
 */
contract Escrow is Ownable {
    // Dynamic trade participants and parameters (set during trade initialization)
    address payable public buyer;
    address payable public seller;
    address public arbitrator;
    address public platformWallet;
    uint256 public feeRate; // in basis points, e.g., 50 means 0.5%

    // Trade amounts (in wei) for the current trade.
    uint256 public cryptoAmount;      
    uint256 public buyerCollateral;   
    uint256 public sellerCollateral;  

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
        address platformWallet
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
     * @notice Constructor initializes the Ownable base with the deployer's address.
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
     *   - Only the owner (platform) may call this.
     *   - No trade is currently active (the previous trade is COMPLETE, CANCELLED, or not yet initialized).
     *
     * @param _buyer The crypto buyer for this trade.
     * @param _seller The crypto seller for this trade.
     * @param _arbitrator The arbitrator for this trade.
     * @param _cryptoAmount The crypto amount (in wei) deposited by the seller.
     * @param _buyerCollateral The buyer's collateral (in wei).
     * @param _sellerCollateral The seller's collateral (in wei).
     * @param depositDuration Duration (in seconds) until deposits must be complete.
     * @param _confirmationDuration Duration (in seconds) for fiat confirmations after deposits.
     * @param _disputeTimeout Duration (in seconds) for arbitrator dispute resolution.
     * @param _feeRate The fee rate (in basis points) for this trade.
     * @param _platformWallet The platform wallet address for this trade.
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
        address _platformWallet
    ) external onlyOwner {
        require(
            tradeState == State.COMPLETE ||
            tradeState == State.CANCELLED ||
            tradeState == State.AWAITING_TRADE_INIT,
            "Existing trade in progress"
        );
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
        // Reset trade flags.
        buyerDeposited = false;
        sellerDeposited = false;
        fiatSentConfirmed = false;
        fiatReceivedConfirmed = false;
        tradeState = State.AWAITING_DEPOSITS;
        emit TradeInitialized(_buyer, _seller, _arbitrator, depositDeadline, _confirmationDuration, _disputeTimeout, _feeRate, _platformWallet);
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
     * @notice Seller deposits the crypto amount plus his collateral.
     */
    function depositBySeller() external payable nonReentrant {
        require(tradeState == State.AWAITING_DEPOSITS, "Deposits not allowed");
        require(block.timestamp <= depositDeadline, "Deposit deadline passed");
        require(msg.sender == seller, "Only seller can deposit");
        require(!sellerDeposited, "Seller already deposited");
        require(msg.value == cryptoAmount + sellerCollateral, "Incorrect seller deposit amount");

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
     * - A fee is deducted and sent to the platform wallet.
     * - Buyer receives (cryptoAmount - fee) plus buyer collateral.
     * - Seller receives seller collateral.
     */
    function releaseTrade() external nonReentrant {
        require(tradeState == State.AWAITING_CONFIRMATIONS, "Trade not in confirmation phase");
        require(msg.sender == seller, "Only seller can release trade");
        require(fiatSentConfirmed && fiatReceivedConfirmed, "Fiat confirmations incomplete");
        
        tradeState = State.COMPLETE;
        uint256 fee = (cryptoAmount * feeRate) / 10000;
        uint256 buyerAmount = (cryptoAmount - fee) + buyerCollateral;
        uint256 sellerAmount = sellerCollateral;

        // Clear deposit flags.
        buyerDeposited = false;
        sellerDeposited = false;

        // Transfer funds.
        (bool sentBuyer, ) = buyer.call{value: buyerAmount}("");
        require(sentBuyer, "Transfer to buyer failed");
        (bool sentPlatform, ) = platformWallet.call{value: fee}("");
        require(sentPlatform, "Transfer to platform failed");
        (bool sentSeller, ) = seller.call{value: sellerAmount}("");
        require(sentSeller, "Transfer to seller failed");

        emit TradeReleased(cryptoAmount, buyerCollateral, sellerCollateral);
    }

    /**
     * @notice Cancels the trade if deadlines are exceeded.
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

        // Refund deposits.
        if (buyerDeposited) {
            uint256 amount = buyerCollateral;
            buyerDeposited = false;
            (bool sent, ) = buyer.call{value: amount}("");
            require(sent, "Refund to buyer failed");
        }
        if (sellerDeposited) {
            uint256 amount = cryptoAmount + sellerCollateral;
            sellerDeposited = false;
            (bool sent, ) = seller.call{value: amount}("");
            require(sent, "Refund to seller failed");
        }
        emit TradeCancelled();
    }

    /**
     * @notice Either party may raise a dispute if confirmation deadline is exceeded.
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
        // Refund deposits.
        if (buyerDeposited) {
            uint256 amount = buyerCollateral;
            buyerDeposited = false;
            (bool sent, ) = buyer.call{value: amount}("");
            require(sent, "Refund to buyer failed");
        }
        if (sellerDeposited) {
            uint256 amount = cryptoAmount + sellerCollateral;
            sellerDeposited = false;
            (bool sent, ) = seller.call{value: amount}("");
            require(sent, "Refund to seller failed");
        }
        emit DisputeEscalated();
    }

    /**
     * @notice The arbitrator resolves a dispute.
     * @param decision If true, trade is released (with fee charged); if false, trade is cancelled.
     * @param penalizedParty Indicates which party is penalized (0: none, 1: buyer, 2: seller).
     */
    function resolveDispute(bool decision, uint8 penalizedParty) external nonReentrant {
        require(tradeState == State.DISPUTED, "No dispute to resolve");
        require(msg.sender == arbitrator, "Only arbitrator can resolve dispute");
        require(penalizedParty <= 2, "Invalid penalty option");

        uint256 buyerAmount;
        uint256 sellerAmount;
        uint256 fee = 0; // Only applied upon trade release.
        
        if (decision) {
            fee = (cryptoAmount * feeRate) / 10000;
            if (penalizedParty == 1) {
                // Buyer penalized: forfeits collateral.
                buyerAmount = (cryptoAmount - fee);
                sellerAmount = sellerCollateral + buyerCollateral;
            } else if (penalizedParty == 2) {
                // Seller penalized: forfeits collateral.
                buyerAmount = (cryptoAmount - fee) + buyerCollateral + sellerCollateral;
                sellerAmount = 0;
            } else {
                // No penalty: normal release.
                buyerAmount = (cryptoAmount - fee) + buyerCollateral;
                sellerAmount = sellerCollateral;
            }
        } else {
            // Trade cancelled: no fee charged.
            if (penalizedParty == 1) {
                buyerAmount = 0;
                sellerAmount = cryptoAmount + sellerCollateral + buyerCollateral;
            } else if (penalizedParty == 2) {
                buyerAmount = cryptoAmount + buyerCollateral + sellerCollateral;
                sellerAmount = 0;
            } else {
                buyerAmount = buyerCollateral;
                sellerAmount = cryptoAmount + sellerCollateral;
            }
        }

        tradeState = State.COMPLETE;
        buyerDeposited = false;
        sellerDeposited = false;

        if (buyerAmount > 0) {
            (bool sentBuyer, ) = buyer.call{value: buyerAmount}("");
            require(sentBuyer, "Transfer to buyer failed");
        }
        if (fee > 0 && decision) {
            (bool sentPlatform, ) = platformWallet.call{value: fee}("");
            require(sentPlatform, "Transfer to platform failed");
        }
        if (sellerAmount > 0) {
            (bool sentSeller, ) = seller.call{value: sellerAmount}("");
            require(sentSeller, "Transfer to seller failed");
        }

        emit DisputeResolved(decision, penalizedParty);
    }
}
