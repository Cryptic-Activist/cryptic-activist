const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer:", deployer.address);

  const targetAddresses = [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
    "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
    "0x976EA74026E726554dB657fA54763abd0C3a0aa9",
    "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955",
    "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f",
    "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720",
    "0xBcd4042DE499D14e55001CcbB24a551F3b954096",
  ];

  // Deploy MockToken (USDC, 6 decimals)
  const MockToken = await hre.ethers.getContractFactory("MockToken");
  const usdc = await MockToken.deploy(
    "MockUSDC",
    "USDC",
    6,
    hre.ethers.parseUnits("10000000", 6) // 10,000,000 USDC
  );
  await usdc.waitForDeployment();
  const usdcContractAddress = await usdc.getAddress();
  console.log("USDC deployed to:", usdcContractAddress);
  const usdcContract = await hre.ethers.getContractAt(
    "MockToken",
    usdcContractAddress
  );

  // Deploy MockToken (DAI, 18 decimals)
  const dai = await MockToken.deploy(
    "MockDAI",
    "DAI",
    18,
    hre.ethers.parseUnits("10000000", 18) // 10,000,000 DAI
  );
  await dai.waitForDeployment();
  const daiContractAddress = await dai.getAddress();
  console.log("DAI deployed to:", daiContractAddress);
  const daiContract = await hre.ethers.getContractAt(
    "MockToken",
    daiContractAddress
  );

  // Verify decimals
  const usdcDecimals = await usdcContract.decimals();
  const daiDecimals = await daiContract.decimals();
  console.log("USDC decimals:", usdcDecimals.toString());
  console.log("DAI decimals:", daiDecimals.toString());

  // Mint tokens to target addresses
  const amountUSDC = hre.ethers.parseUnits("10000000", usdcDecimals); // 10,000,000 USDC
  const amountDAI = hre.ethers.parseUnits("10000000", daiDecimals); // 10,000,000 DAI
  const mintPromises = targetAddresses.map(async (address) => {
    const txUSDC = await usdcContract.mint(address, amountUSDC);
    const txDAI = await daiContract.mint(address, amountDAI);
    await txUSDC.wait();
    await txDAI.wait();
    return address;
  });
  const mintedAddresses = await Promise.all(mintPromises);

  // Save deployment info
  const deploymentInfo = {
    usdcContractAddress,
    daiContractAddress,
    minted: `${hre.ethers.formatUnits(
      amountUSDC,
      usdcDecimals
    )} USDC and ${hre.ethers.formatUnits(
      amountDAI,
      daiDecimals
    )} DAI were minted`,
    addresses: mintedAddresses,
  };

  const network = await hre.ethers.provider.getNetwork();
  const networkName = network.name === "unknown" ? "localhost" : network.name;
  const deploymentFile = `deployments/MockToken/${networkName}_deployment.json`;

  // Create deployments directory if it doesn't exist
  if (!fs.existsSync("deployments/MockToken")) {
    fs.mkdirSync("deployments/MockToken", { recursive: true });
  }

  console.log("Deployment info:", deploymentInfo);

  fs.writeFileSync(
    deploymentFile,
    JSON.stringify(
      deploymentInfo,
      (_, v) => (typeof v === "bigint" ? v.toString() : v),
      2
    )
  );
  console.log("Deployment info saved to:", deploymentFile);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
