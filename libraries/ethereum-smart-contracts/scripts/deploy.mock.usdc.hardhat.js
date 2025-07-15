// scripts/deploy.ts

const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const MockUSDCFactory = await hre.ethers.getContractFactory("MockUSDC");
  const usdc = await MockUSDCFactory.deploy();
  await usdc.waitForDeployment();

  const usdcContractAddress = await usdc.getAddress();
  const targetAddress = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
  const MockUSDC = await hre.ethers.getContractAt(
    "MockUSDC",
    usdcContractAddress
  );

  const amount = hre.ethers.parseUnits("10000", 6);
  const tx = await MockUSDC.mint(targetAddress, amount);
  await tx.wait();

  console.log({
    minted: `Minted ${amount} USDC to ${targetAddress}`,
    usdcContractAddress,
  });
}

main();
