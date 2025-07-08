// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract MultiTradeEscrow {
    address public platformWallet;
    address public owner;
    
    uint256 public defaultFeeRate; // Basis points (1/100 of a percent)
    uint256 public defaultProfitMargin; // Basis points
    uint256 public tradeCount;
    
    enum TradeState { Created, SellerFunded, BuyerFunded, FullyFunded, Executed, Disputed, Completed, Cancelled }
    
    struct Trade {
        uint256 id;
        address buyer;
        address seller;
        address arbitrator;
        uint256 cryptoAmount;
        uint256 buyerCollateral;
        uint256 sellerCollateral;
        uint256 sellerTotalDeposit;
        uint256 feeRate; // Basis points
        uint256 profitMargin; // Basis points
        uint256 tradeDeadline;
        TradeState state;
        bool sellerFunded;
        bool buyerFunded;
    }
    
    // Mapping from trade ID to Trade struct
    mapping(uint256 => Trade) public trades;
    
    // Events
    event TradeCreated(uint256 indexed tradeId, address indexed buyer, address indexed seller, uint256 amount);
    event SellerFunded(uint256 indexed tradeId, uint256 amount);
    event BuyerFunded(uint256 indexed tradeId, uint256 collateral);
    event TradeFullyFunded(uint256 indexed tradeId);
    event TradeExecuted(uint256 indexed tradeId);
    event TradeDisputed(uint256 indexed tradeId, address initiator);
    event TradeCompleted(uint256 indexed tradeId);
    event TradeCancelled(uint256 indexed tradeId);
    event ArbitrationResolved(uint256 indexed tradeId, address winner, uint256 buyerAmount, uint256 sellerAmount);

    // Constructor
    constructor(address _platformWallet, uint256 _feeRate, uint256 _profitMargin) {
        require(_platformWallet != address(0), "Invalid platform wallet");
        require(_feeRate < 10000, "Fee rate too high"); // Max 100%
        require(_profitMargin < 10000, "Profit margin too high"); // Max 100%
        
        platformWallet = _platformWallet;
        defaultFeeRate = _feeRate;
        defaultProfitMargin = _profitMargin;
        owner = msg.sender;
        tradeCount = 0;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyBuyer(uint256 _tradeId) {
        require(msg.sender == trades[_tradeId].buyer, "Only buyer can call this function");
        _;
    }
    
    modifier onlySeller(uint256 _tradeId) {
        require(msg.sender == trades[_tradeId].seller, "Only seller can call this function");
        _;
    }
    
    modifier onlyArbitrator(uint256 _tradeId) {
        require(msg.sender == trades[_tradeId].arbitrator, "Only arbitrator can call this function");
        _;
    }
    
    modifier onlyTradeParticipant(uint256 _tradeId) {
        require(
            msg.sender == trades[_tradeId].buyer || 
            msg.sender == trades[_tradeId].seller, 
            "Only trade participants can call this function"
        );
        _;
    }
    
    modifier inState(uint256 _tradeId, TradeState _state) {
        require(trades[_tradeId].state == _state, "Invalid state for this operation");
        _;
    }
    
    modifier tradeExists(uint256 _tradeId) {
        require(_tradeId < tradeCount, "Trade does not exist");
        _;
    }
    
    /**
     * @dev Create a new trade between buyer and seller
     */
    function createTrade(
        address _buyer,
        address _seller,
        address _arbitrator,
        uint256 _cryptoAmount,
        uint256 _buyerCollateral,
        uint256 _sellerCollateral,
        uint256 _sellerTotalDeposit,
        uint256 _tradeDuration,
        uint256 _feeRate,
        uint256 _profitMargin
    ) public returns (uint256) {
        require(_buyer != address(0) && _seller != address(0) && _arbitrator != address(0), "Invalid addresses");
        require(_cryptoAmount > 0, "Amount must be greater than 0");
        
        // Use default fee and margin if 0 is provided
        uint256 feeRate = _feeRate > 0 ? _feeRate : defaultFeeRate;
        uint256 profitMargin = _profitMargin > 0 ? _profitMargin : defaultProfitMargin;
        
        // Validate fee and margin
        require(feeRate < 10000, "Fee rate too high");
        require(profitMargin < 10000, "Profit margin too high");
        
        uint256 tradeId = tradeCount;
        tradeCount++;
        
        trades[tradeId] = Trade({
            id: tradeId,
            buyer: _buyer,
            seller: _seller,
            arbitrator: _arbitrator,
            cryptoAmount: _cryptoAmount,
            buyerCollateral: _buyerCollateral,
            sellerCollateral: _sellerCollateral,
            sellerTotalDeposit: _sellerTotalDeposit,
            feeRate: feeRate,
            profitMargin: profitMargin,
            tradeDeadline: block.timestamp + _tradeDuration,
            state: TradeState.Created,
            sellerFunded: false,
            buyerFunded: false
        });
        
        emit TradeCreated(tradeId, _buyer, _seller, _cryptoAmount);
        return tradeId;
    }
    
    /**
     * @dev Seller funds the trade with crypto amount and collateral
     */
    function sellerFundTrade(uint256 _tradeId) 
        external 
        payable 
        onlySeller(_tradeId)
        tradeExists(_tradeId) 
    {
        Trade storage trade = trades[_tradeId];
        require(trade.state == TradeState.Created || trade.state == TradeState.BuyerFunded, "Invalid state for seller funding");
        require(!trade.sellerFunded, "Seller already funded");
        require(msg.value == trade.sellerTotalDeposit, "Incorrect amount sent");
        
        trade.sellerFunded = true;
        
        if (trade.state == TradeState.Created) {
            trade.state = TradeState.SellerFunded;
        } else if (trade.state == TradeState.BuyerFunded) {
            trade.state = TradeState.FullyFunded;
            emit TradeFullyFunded(_tradeId);
        }
        
        emit SellerFunded(_tradeId, trade.sellerTotalDeposit);
    }
    
    /**
     * @dev Buyer funds the trade with collateral
     */
    function buyerFundTrade(uint256 _tradeId) 
        external 
        payable 
        onlyBuyer(_tradeId)
        tradeExists(_tradeId) 
    {
        Trade storage trade = trades[_tradeId];
        require(trade.state == TradeState.Created || trade.state == TradeState.SellerFunded, "Invalid state for buyer funding");
        require(!trade.buyerFunded, "Buyer already funded");
        require(msg.value >= trade.buyerCollateral, "Insufficient collateral");
        
        trade.buyerFunded = true;
        
        if (trade.state == TradeState.Created) {
            trade.state = TradeState.BuyerFunded;
        } else if (trade.state == TradeState.SellerFunded) {
            trade.state = TradeState.FullyFunded;
            emit TradeFullyFunded(_tradeId);
        }
        
        emit BuyerFunded(_tradeId, msg.value);
    }
    
    /**
     * @dev Execute the trade (can be called by buyer to confirm receipt)
     */
    function executeTrade(uint256 _tradeId) 
        external 
        onlyOwner()
        inState(_tradeId, TradeState.FullyFunded) 
        tradeExists(_tradeId) 
    {
        Trade storage trade = trades[_tradeId];
        trade.state = TradeState.Executed;
        emit TradeExecuted(_tradeId);
        
        // Auto-complete the trade
        _completeTrade(_tradeId);
    }
    
    /**
     * @dev Either party can raise a dispute
     */
    function disputeTrade(uint256 _tradeId) 
        external 
        onlyTradeParticipant(_tradeId)
        tradeExists(_tradeId) 
    {
        Trade storage trade = trades[_tradeId];
        require(trade.state == TradeState.FullyFunded || trade.state == TradeState.Executed, "Invalid state for dispute");
        
        trade.state = TradeState.Disputed;
        emit TradeDisputed(_tradeId, msg.sender);
    }
    
    /**
     * @dev Arbitrator resolves disputes
     * @param _tradeId Trade ID to resolve
     * @param buyerPercentage Percentage of funds to be sent to buyer (0-100)
     */
    function resolveDispute(uint256 _tradeId, uint256 buyerPercentage) 
        external 
        onlyOwner() 
        inState(_tradeId, TradeState.Disputed) 
        tradeExists(_tradeId) 
    {
        require(buyerPercentage <= 100, "Invalid percentage");
        
        Trade storage trade = trades[_tradeId];
        
        uint256 platformFee = (trade.cryptoAmount * trade.feeRate) / 10000;
        uint256 platformProfit = (trade.cryptoAmount * trade.profitMargin) / 10000;
        uint256 totalPlatformAmount = platformFee + platformProfit;
        
        uint256 remainingAmount = trade.cryptoAmount - totalPlatformAmount;
        uint256 buyerAmount = (remainingAmount * buyerPercentage) / 100;
        uint256 sellerAmount = remainingAmount - buyerAmount;
        
        // Return collaterals
        buyerAmount += trade.buyerCollateral;
        sellerAmount += trade.sellerCollateral;
        
        // Transfer funds
        payable(platformWallet).transfer(totalPlatformAmount);
        payable(trade.buyer).transfer(buyerAmount);
        payable(trade.seller).transfer(sellerAmount);
        
        trade.state = TradeState.Completed;
        emit ArbitrationResolved(_tradeId, buyerPercentage > 50 ? trade.buyer : trade.seller, buyerAmount, sellerAmount);
    }
    
    /**
     * @dev Internal function to complete the trade
     */
    function _completeTrade(uint256 _tradeId) private {
        Trade storage trade = trades[_tradeId];
        
        uint256 platformFee = (trade.cryptoAmount * trade.feeRate) / 10000;
        uint256 platformProfit = (trade.cryptoAmount * trade.profitMargin) / 10000;
        uint256 totalPlatformAmount = platformFee + platformProfit;
        
        uint256 sellerAmount = trade.sellerCollateral;
        uint256 buyerAmount = trade.cryptoAmount + trade.buyerCollateral - totalPlatformAmount;

        // Transfer funds
        payable(platformWallet).transfer(totalPlatformAmount);
        payable(trade.seller).transfer(sellerAmount);
        payable(trade.buyer).transfer(buyerAmount);
        
        trade.state = TradeState.Completed;
        emit TradeCompleted(_tradeId);
    }
    
    /**
     * @dev Cancels the trade after deadline if not completed
     */
    function _cancelTrade(uint256 _tradeId, bool _forceCancel) internal tradeExists(_tradeId) {
        Trade storage trade = trades[_tradeId];
        
        if (!_forceCancel) {
            require(block.timestamp > trade.tradeDeadline, "Trade deadline not reached");
        }
        require(
            trade.state == TradeState.Created || 
            trade.state == TradeState.SellerFunded || 
            trade.state == TradeState.BuyerFunded || 
            trade.state == TradeState.FullyFunded, 
            "Cannot cancel in current state"
        );
        
        // Return funds to respective parties
        if (trade.sellerFunded) {
            payable(trade.seller).transfer(trade.sellerTotalDeposit);
        }
        if (trade.buyerFunded) {
            payable(trade.buyer).transfer(trade.buyerCollateral);
        }
        
        trade.state = TradeState.Cancelled;
        emit TradeCancelled(_tradeId);
    }

    function cancelTrade(uint256 _tradeId, bool _forceCancel) external onlyOwner tradeExists(_tradeId) {
        _cancelTrade(_tradeId, _forceCancel);
    }

    function autoCancelTrades() external {
        // Loop through all existing trades
        uint256 i;
        for (i = 0; i < tradeCount; i++) {
            Trade storage trade = trades[i];
            
            if(block.timestamp > trade.tradeDeadline && 
            trade.state != TradeState.Cancelled && 
            trade.state != TradeState.Completed) {  
                _cancelTrade(trade.id, false);
            }
        }
    }

    function forceCancelTrade(uint256 _tradeId) external onlyOwner tradeExists(_tradeId) {
        _cancelTrade(_tradeId, true);
    }
    
    /**
     * @dev Update platform wallet address
     */
    function updatePlatformWallet(address _newPlatformWallet) external onlyOwner {
        require(_newPlatformWallet != address(0), "Invalid platform wallet");
        platformWallet = _newPlatformWallet;
    }
    
    /**
     * @dev Update default fee rate
     */
    function updateDefaultFeeRate(uint256 _newFeeRate) external onlyOwner {
        require(_newFeeRate < 10000, "Fee rate too high");
        defaultFeeRate = _newFeeRate;
    }
    
    /**
     * @dev Update default profit margin
     */
    function updateDefaultProfitMargin(uint256 _newProfitMargin) external onlyOwner {
        require(_newProfitMargin < 10000, "Profit margin too high");
        defaultProfitMargin = _newProfitMargin;
    }
    
    /**
     * @dev Get trade details
     */
    function getTrade(uint256 _tradeId) external view tradeExists(_tradeId) returns (
        address buyer,
        address seller,
        address arbitrator,
        uint256 cryptoAmount,
        uint256 buyerCollateral,
        uint256 sellerCollateral,
        uint256 sellerTotalDeposit,
        uint256 feeRate,
        uint256 profitMargin,
        uint256 tradeDeadline,
        TradeState state,
        bool sellerFunded,
        bool buyerFunded
    ) {
        Trade storage trade = trades[_tradeId];
        return (
            trade.buyer,
            trade.seller,
            trade.arbitrator,
            trade.cryptoAmount,
            trade.buyerCollateral,
            trade.sellerCollateral,
            trade.sellerTotalDeposit,
            trade.feeRate,
            trade.profitMargin,
            trade.tradeDeadline,
            trade.state,
            trade.sellerFunded,
            trade.buyerFunded
        );
    }
    
    /**
     * @dev Get contract balance
     */
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}