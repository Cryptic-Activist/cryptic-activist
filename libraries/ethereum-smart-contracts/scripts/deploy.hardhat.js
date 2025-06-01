// scripts/deploy-multi-escrow.js
const hre = require("hardhat");

async function main() {
  console.log("Starting deployment of MultiTradeEscrow contract...");

  // Get deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);

  // Check deployer balance
  const balance = await deployer.provider.getBalance(deployer.address);
  console.log(`Account balance: ${hre.ethers.formatEther(balance)} ETH`);

  // Deployment parameters
  const params = {
    platformWallet: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    defaultFeeRate: 150, // 1.5% platform fee
    defaultProfitMargin: 250, // 2.5% profit margin
  };

  // Deploy the contract
  const MultiTradeEscrow = await hre.ethers.getContractFactory(
    "MultiTradeEscrow"
  );
  const escrow = await MultiTradeEscrow.deploy(
    params.platformWallet,
    params.defaultFeeRate,
    params.defaultProfitMargin
  );

  await escrow.waitForDeployment();
  const escrowAddress = await escrow.getAddress();
  console.log(`MultiTradeEscrow deployed to: ${escrowAddress}`);

  // Verify contract on Etherscan (if on supported network)
  if (network.name !== "hardhat" && network.name !== "localhost") {
    console.log("Waiting for block confirmations...");
    await escrow.deploymentTransaction().wait(6); // wait for 6 confirmations

    console.log("Verifying contract on Etherscan...");
    try {
      await hre.run("verify:verify", {
        address: escrowAddress,
        constructorArguments: [
          params.platformWallet,
          params.defaultFeeRate,
          params.defaultProfitMargin,
        ],
      });
      console.log("Contract verified on Etherscan");
    } catch (error) {
      console.error("Error verifying contract:", error);
    }
  }

  // Return deployment info
  return {
    escrowContractAddress: escrowAddress,
    deployerAddress: deployer.address,
    params: params,
  };
}

main()
  .then((deployInfo) => {
    console.log("Deployment completed successfully!");
    console.log(JSON.stringify(deployInfo, null, 2));
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
