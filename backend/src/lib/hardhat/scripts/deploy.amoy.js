const hre = require("hardhat");
require("dotenv").config();

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying with:", deployer.address);

  const MultiTradeEscrow = await hre.ethers.getContractFactory(
    "MultiTradeEscrow"
  );

  const platformWallet = process.env.PLATFORM_WALLET_ADDRESS; // replace
  const feeRate = 200; // 2%
  const profitMargin = 300; // 3%

  const escrow = await MultiTradeEscrow.deploy(
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
