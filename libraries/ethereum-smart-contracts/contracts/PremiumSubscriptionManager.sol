// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Simple ERC20 interface
interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
}

contract PremiumSubscriptionManager {
    
    // Subscription plans
    enum PlanType { MONTHLY, YEARLY }
    
    // Subscription structure
    struct Subscription {
        bool isActive;
        uint256 expiryTimestamp;
        PlanType planType;
        uint256 lastPaymentAmount;
        bytes32 lastPaymentHash;
        uint256 paymentCount;
    }
    
    // Events
    event SubscriptionActivated(
        address indexed user, 
        PlanType planType, 
        uint256 expiryTimestamp,
        bytes32 paymentHash
    );
    
    event SubscriptionRenewed(
        address indexed user, 
        PlanType planType, 
        uint256 newExpiryTimestamp,
        bytes32 paymentHash
    );
    
    event PriceUpdated(PlanType planType, uint256 newPrice);
    event PaymentTokenUpdated(address newToken);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    
    // State variables
    mapping(address => Subscription) public subscriptions;
    mapping(PlanType => uint256) public subscriptionPrices;
    
    IERC20 public paymentToken; // Token used for payments (e.g., USDC, USDT)
    uint256 public constant SECONDS_IN_MONTH = 30 days;
    uint256 public constant SECONDS_IN_YEAR = 365 days;
    
    // Mapping to track payment hashes to prevent replay attacks
    mapping(bytes32 => bool) public usedPaymentHashes;
    
    // Owner management
    address public owner;
    
    // Reentrancy guard
    bool private locked;
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }
    
    modifier nonReentrant() {
        require(!locked, "Reentrant call");
        locked = true;
        _;
        locked = false;
    }
    
    constructor(
        address _paymentToken,
        uint256 _monthlyPrice,
        uint256 _yearlyPrice
    ) {
        owner = msg.sender;
        paymentToken = IERC20(_paymentToken);
        subscriptionPrices[PlanType.MONTHLY] = _monthlyPrice;
        subscriptionPrices[PlanType.YEARLY] = _yearlyPrice;
        
        emit OwnershipTransferred(address(0), msg.sender);
    }
    
    /**
     * @dev Transfer ownership to a new address
     * @param newOwner The address to transfer ownership to
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "New owner cannot be zero address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }
    
    /**
     * @dev Renounce ownership (set owner to zero address)
     */
    function renounceOwnership() external onlyOwner {
        emit OwnershipTransferred(owner, address(0));
        owner = address(0);
    }
    
    /**
     * @dev Subscribe to premium plan
     * @param planType The type of subscription (MONTHLY or YEARLY)
     */
    function subscribe(PlanType planType) external nonReentrant {
        require(subscriptionPrices[planType] > 0, "Invalid plan type");
        
        uint256 price = subscriptionPrices[planType];
        require(
            paymentToken.transferFrom(msg.sender, address(this), price),
            "Payment failed"
        );
        
        // Generate payment hash for verification
        bytes32 paymentHash = generatePaymentHash(msg.sender, planType, price, block.timestamp);
        
        // Ensure hash hasn't been used before
        require(!usedPaymentHashes[paymentHash], "Payment hash already used");
        usedPaymentHashes[paymentHash] = true;
        
        uint256 duration = planType == PlanType.MONTHLY ? SECONDS_IN_MONTH : SECONDS_IN_YEAR;
        uint256 expiryTimestamp;
        
        // If user already has an active subscription, extend it
        if (subscriptions[msg.sender].isActive && subscriptions[msg.sender].expiryTimestamp > block.timestamp) {
            expiryTimestamp = subscriptions[msg.sender].expiryTimestamp + duration;
        } else {
            expiryTimestamp = block.timestamp + duration;
        }
        
        // Update subscription
        subscriptions[msg.sender] = Subscription({
            isActive: true,
            expiryTimestamp: expiryTimestamp,
            planType: planType,
            lastPaymentAmount: price,
            lastPaymentHash: paymentHash,
            paymentCount: subscriptions[msg.sender].paymentCount + 1
        });
        
        emit SubscriptionActivated(msg.sender, planType, expiryTimestamp, paymentHash);
    }
    
    /**
     * @dev Renew existing subscription
     * @param planType The type of subscription to renew
     */
    function renewSubscription(PlanType planType) external nonReentrant {
        require(subscriptions[msg.sender].isActive, "No active subscription");
        require(subscriptionPrices[planType] > 0, "Invalid plan type");
        
        uint256 price = subscriptionPrices[planType];
        require(
            paymentToken.transferFrom(msg.sender, address(this), price),
            "Payment failed"
        );
        
        // Generate payment hash for verification
        bytes32 paymentHash = generatePaymentHash(msg.sender, planType, price, block.timestamp);
        
        // Ensure hash hasn't been used before
        require(!usedPaymentHashes[paymentHash], "Payment hash already used");
        usedPaymentHashes[paymentHash] = true;
        
        uint256 duration = planType == PlanType.MONTHLY ? SECONDS_IN_MONTH : SECONDS_IN_YEAR;
        uint256 newExpiryTimestamp;
        
        // Extend from current expiry or current time, whichever is later
        if (subscriptions[msg.sender].expiryTimestamp > block.timestamp) {
            newExpiryTimestamp = subscriptions[msg.sender].expiryTimestamp + duration;
        } else {
            newExpiryTimestamp = block.timestamp + duration;
        }
        
        // Update subscription
        subscriptions[msg.sender].expiryTimestamp = newExpiryTimestamp;
        subscriptions[msg.sender].planType = planType;
        subscriptions[msg.sender].lastPaymentAmount = price;
        subscriptions[msg.sender].lastPaymentHash = paymentHash;
        subscriptions[msg.sender].paymentCount += 1;
        
        emit SubscriptionRenewed(msg.sender, planType, newExpiryTimestamp, paymentHash);
    }
    
    /**
     * @dev Check if a user has an active premium subscription
     * @param user The address to check
     * @return bool indicating if subscription is active
     */
    function isSubscriptionActive(address user) external view returns (bool) {
        return subscriptions[user].isActive && subscriptions[user].expiryTimestamp > block.timestamp;
    }
    
    /**
     * @dev Get subscription details for a user
     * @param user The address to check
     * @return Subscription struct with all details
     */
    function getSubscriptionDetails(address user) external view returns (Subscription memory) {
        return subscriptions[user];
    }
    
    /**
     * @dev Get the payment hash for verification purposes
     * @param user The user address
     * @return bytes32 The last payment hash for the user
     */
    function getPaymentHash(address user) external view returns (bytes32) {
        return subscriptions[user].lastPaymentHash;
    }
    
    /**
     * @dev Verify if a payment hash is valid and belongs to a user
     * @param user The user address
     * @param paymentHash The hash to verify
     * @return bool indicating if the hash is valid
     */
    function verifyPaymentHash(address user, bytes32 paymentHash) external view returns (bool) {
        return subscriptions[user].lastPaymentHash == paymentHash && 
               subscriptions[user].isActive &&
               subscriptions[user].expiryTimestamp > block.timestamp;
    }
    
    /**
     * @dev Generate a unique payment hash
     * @param user The user making the payment
     * @param planType The subscription plan type
     * @param amount The payment amount
     * @param timestamp The payment timestamp
     * @return bytes32 The generated hash
     */
    function generatePaymentHash(
        address user,
        PlanType planType,
        uint256 amount,
        uint256 timestamp
    ) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(user, planType, amount, timestamp));
    }
    
    /**
     * @dev Get time remaining on subscription
     * @param user The user address
     * @return uint256 Seconds remaining (0 if expired)
     */
    function getTimeRemaining(address user) external view returns (uint256) {
        if (!subscriptions[user].isActive || subscriptions[user].expiryTimestamp <= block.timestamp) {
            return 0;
        }
        return subscriptions[user].expiryTimestamp - block.timestamp;
    }
    
    /**
     * @dev Get current subscription price for a plan type
     * @param planType The plan type to check
     * @return uint256 The current price
     */
    function getSubscriptionPrice(PlanType planType) external view returns (uint256) {
        return subscriptionPrices[planType];
    }
    
    /**
     * @dev Check if user has ever had a subscription
     * @param user The user address
     * @return bool indicating if user has payment history
     */
    function hasSubscriptionHistory(address user) external view returns (bool) {
        return subscriptions[user].paymentCount > 0;
    }
    
    // Admin functions
    
    /**
     * @dev Update subscription prices (only owner)
     * @param planType The plan to update
     * @param newPrice The new price
     */
    function updatePrice(PlanType planType, uint256 newPrice) external onlyOwner {
        subscriptionPrices[planType] = newPrice;
        emit PriceUpdated(planType, newPrice);
    }
    
    /**
     * @dev Update payment token (only owner)
     * @param newToken The new payment token address
     */
    function updatePaymentToken(address newToken) external onlyOwner {
        require(newToken != address(0), "Token cannot be zero address");
        paymentToken = IERC20(newToken);
        emit PaymentTokenUpdated(newToken);
    }
    
    /**
     * @dev Withdraw collected payments (only owner)
     * @param amount The amount to withdraw
     */
    function withdrawPayments(uint256 amount) external onlyOwner {
        require(amount > 0, "Amount must be greater than 0");
        require(paymentToken.transfer(owner, amount), "Withdrawal failed");
    }
    
    /**
     * @dev Withdraw all collected payments (only owner)
     */
    function withdrawAllPayments() external onlyOwner {
        uint256 balance = paymentToken.balanceOf(address(this));
        require(balance > 0, "No tokens to withdraw");
        require(paymentToken.transfer(owner, balance), "Withdrawal failed");
    }
    
    /**
     * @dev Get contract balance
     * @return uint256 The current token balance
     */
    function getContractBalance() external view returns (uint256) {
        return paymentToken.balanceOf(address(this));
    }
    
    /**
     * @dev Emergency function to deactivate a subscription (only owner)
     * @param user The user whose subscription to deactivate
     */
    function deactivateSubscription(address user) external onlyOwner {
        subscriptions[user].isActive = false;
    }
    
    /**
     * @dev Emergency function to extend a subscription (only owner)
     * @param user The user whose subscription to extend
     * @param additionalTime Additional time in seconds
     */
    function extendSubscription(address user, uint256 additionalTime) external onlyOwner {
        require(subscriptions[user].isActive, "User has no active subscription");
        subscriptions[user].expiryTimestamp += additionalTime;
    }
    
    /**
     * @dev Pause new subscriptions (only owner)
     */
    function pauseSubscriptions() external onlyOwner {
        subscriptionPrices[PlanType.MONTHLY] = 0;
        subscriptionPrices[PlanType.YEARLY] = 0;
    }
}