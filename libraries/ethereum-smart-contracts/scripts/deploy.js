const { ethers } = require("hardhat");

async function main() {
  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Check deployer balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Deployer balance:", ethers.formatEther(balance), "ETH");

  // Get the Escrow contract factory
  const Escrow = await ethers.getContractFactory("Escrow");

  // Deploy the Escrow contract
  console.log("Deploying Escrow contract...");
  const escrow = await Escrow.deploy();

  // Wait for the contract to be deployed
  await escrow.waitForDeployment();

  // Get the deployed contract address
  const escrowAddress = await escrow.getAddress();
  console.log("Escrow contract address:", escrowAddress);

  // Verify the contract owner (optional)
  const owner = await escrow.owner();
  console.log("Contract owner:", owner);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });
