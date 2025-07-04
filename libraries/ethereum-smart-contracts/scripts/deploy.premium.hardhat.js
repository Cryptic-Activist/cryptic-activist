const { ethers } = require("hardhat");

const mockERC20Source = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MockERC20 {
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;
    
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    constructor(string memory _name, string memory _symbol, uint8 _decimals, uint256 _totalSupply) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        totalSupply = _totalSupply;
        balanceOf[msg.sender] = _totalSupply;
    }
    
    function transfer(address to, uint256 amount) external returns (bool) {
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }
    
    function approve(address spender, uint256 amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }
    
    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        allowance[from][msg.sender] -= amount;
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        emit Transfer(from, to, amount);
        return true;
    }
    
    function mint(address to, uint256 amount) external {
        balanceOf[to] += amount;
        totalSupply += amount;
        emit Transfer(address(0), to, amount);
    }
}
`;

async function main() {
  console.log("Starting deployment of PremiumSubscriptionManager...");

  // Get the contract factory
  const PremiumSubscriptionManager = await ethers.getContractFactory(
    "PremiumSubscriptionManager"
  );

  // Deployment configuration
  const deployConfig = {
    // Network-specific token addresses
    networks: {
      // Ethereum Mainnet
      mainnet: {
        usdc: "0xA0b86a33E6441935c477df1f2C2e6CD7E3F5e9a2",
        usdt: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        dai: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      },
      // Polygon
      polygon: {
        usdc: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
        usdt: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
        dai: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
      },
      // Arbitrum
      arbitrum: {
        usdc: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        usdt: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
        dai: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
      },
      // BSC
      bsc: {
        usdc: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
        usdt: "0x55d398326f99059fF775485246999027B3197955",
        dai: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
      },
      // Testnet addresses (using mock tokens or testnet versions)
      goerli: {
        usdc: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F", // Goerli USDC
        usdt: "0xC2C527C0CACF457746Bd31B2a698Fe89de2b6d49", // Goerli USDT
        dai: "0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844", // Goerli DAI
      },
      // Local/Hardhat - will deploy mock token
      localhost: {
        usdc: null, // Will be deployed
        usdt: null,
        dai: null,
      },
    },
  };

  // Get network name
  const network = await ethers.provider.getNetwork();
  const networkName = network.name === "unknown" ? "localhost" : network.name;

  console.log(`Deploying to network: ${networkName}`);
  console.log(`Chain ID: ${network.chainId}`);

  // Get deployer account
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying with account: ${deployer.address}`);

  // Check deployer balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log(`Deployer balance: ${ethers.formatEther(balance)} ETH`);

  let paymentTokenAddress;

  // Handle token address based on network
  if (networkName === "localhost" || networkName === "hardhat") {
    // Deploy a mock ERC20 token for testing
    console.log("Deploying mock USDC token for testing...");

    const MockERC20 = await ethers.getContractFactory("MockERC20");
    const mockToken = await MockERC20.deploy(
      "Mock USDC",
      "USDC",
      6, // 6 decimals like real USDC
      ethers.parseUnits("1000000", 6) // 1M tokens for testing
    );
    await mockToken.waitForDeployment();

    paymentTokenAddress = mockToken.target ?? mockToken.address;
    console.log(`Mock USDC deployed to: ${paymentTokenAddress}`);

    // ✅ Add this check
    if (!paymentTokenAddress || !ethers.isAddress(paymentTokenAddress)) {
      throw new Error(`Invalid payment token address: ${paymentTokenAddress}`);
    }

    // Mint some tokens to deployer for testing
    await mockToken.mint(deployer.address, ethers.parseUnits("10000", 6));
    console.log("Minted 10,000 USDC to deployer for testing");
  } else {
    // Use real token addresses
    const tokenAddresses = deployConfig.networks[networkName];
    if (!tokenAddresses) {
      throw new Error(
        `Network ${networkName} not supported. Please add token addresses for this network.`
      );
    }

    paymentTokenAddress = tokenAddresses.usdc; // Default to USDC
    console.log(`Using USDC token at: ${paymentTokenAddress}`);
  }

  // Deployment parameters
  const monthlyPrice = ethers.parseUnits("10", 6); // $10 monthly (6 decimals for USDC)
  const yearlyPrice = ethers.parseUnits("100", 6); // $100 yearly (6 decimals for USDC)

  console.log(
    `Monthly subscription price: $${ethers.formatUnits(monthlyPrice, 6)}`
  );
  console.log(
    `Yearly subscription price: $${ethers.formatUnits(yearlyPrice, 6)}`
  );

  // Deploy the contract
  console.log("Deploying PremiumSubscriptionManager...");
  const contract = await PremiumSubscriptionManager.deploy(
    paymentTokenAddress,
    monthlyPrice,
    yearlyPrice
  );

  console.log("Waiting for deployment confirmation...");
  await contract.waitForDeployment(); // This is valid in Ethers v6

  console.log(`✅ Contract deployed to: ${contract.target}`);

  // Get deployment transaction hash via deployment transaction receipt
  const receiptWaited = await contract.deploymentTransaction().wait();

  console.log(`📋 Transaction hash: ${contract.deploymentTransaction().hash}`);
  console.log(`⛽ Gas used: ${receiptWaited.gasUsed.toString()}`);
  console.log(`📦 Block number: ${receiptWaited.blockNumber}`);

  // Verify deployment
  console.log("\n🔍 Verifying deployment...");
  const owner = await contract.owner();
  const tokenAddress = await contract.paymentToken();
  const monthlyPriceCheck = await contract.subscriptionPrices(0);
  const yearlyPriceCheck = await contract.subscriptionPrices(1);

  console.log(`Contract owner: ${owner}`);
  console.log(`Payment token: ${tokenAddress}`);
  console.log(`Monthly price: $${ethers.formatUnits(monthlyPriceCheck, 6)}`);
  console.log(`Yearly price: $${ethers.formatUnits(yearlyPriceCheck, 6)}`);

  const deploymentTx = contract.deploymentTransaction();
  const receipt = await deploymentTx.wait();

  // Save deployment info
  const deploymentInfo = {
    network: networkName,
    chainId: network.chainId,
    contractAddress: contract.target,
    paymentToken: paymentTokenAddress,
    owner: owner,
    monthlyPrice: monthlyPrice.toString(),
    yearlyPrice: yearlyPrice.toString(),
    deploymentHash: deploymentTx.hash,
    deploymentBlock: receipt.blockNumber,
    timestamp: new Date().toISOString(),
  };

  // Write deployment info to file
  const fs = require("fs");
  const deploymentFile = `deployments/${networkName}_deployment.json`;

  // Create deployments directory if it doesn't exist
  if (!fs.existsSync("deployments")) {
    fs.mkdirSync("deployments");
  }

  console.log({ deploymentInfo });

  fs.writeFileSync(
    deploymentFile,
    JSON.stringify(
      deploymentInfo,
      (_, v) => (typeof v === "bigint" ? v.toString() : v),
      2
    )
  );
  console.log(`📄 Deployment info saved to: ${deploymentFile}`);

  // Contract verification instructions
  console.log("\n📝 Contract Verification:");
  console.log("To verify the contract on block explorer, run:");
  console.log(
    `npx hardhat verify --network ${networkName} ${contract.target} "${paymentTokenAddress}" "${monthlyPrice}" "${yearlyPrice}"`
  );

  // Usage examples
  console.log("\n🚀 Usage Examples:");
  console.log("// Check if user has active subscription");
  console.log(`const isActive = await contract.isSubscriptionActive("0x...");`);
  console.log("\n// Get payment hash for verification");
  console.log(`const hash = await contract.getPaymentHash("0x...");`);
  console.log("\n// Subscribe to monthly plan");
  console.log(`await contract.subscribe(0); // 0 = MONTHLY`);
  console.log("\n// Subscribe to yearly plan");
  console.log(`await contract.subscribe(1); // 1 = YEARLY`);

  console.log("\n✅ Deployment completed successfully!");
}

// Error handling
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:");
    console.error(error);
    process.exit(1);
  });
