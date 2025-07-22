const hre = require("hardhat");
require("dotenv").config();

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying with:", deployer.address);

  const ERC20Escrow = await hre.ethers.getContractFactory("ERC20Escrow");

  const platformWallet = process.env.PLATFORM_WALLET_ADDRESS; // replace
  const feeRate = 200; // 2%
  const profitMargin = 300; // 3%

  const escrow = await ERC20Escrow.deploy(
    platformWallet,
    feeRate,
    profitMargin
  );
  await escrow.waitForDeployment();

  console.log(
    "Deployed to (Escrow Contract Address):",
    await escrow.getAddress()
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
