npx hardhat run scripts/deploy.native.escrow.amoy.js --network amoy 

echo "Emptying contracts folder..."
rm -rf ../../frontend/public/src/contracts/escrow/artifacts/NativeTokenEscrow.*
rm -rf ../../backend/src/contracts/escrow/artifacts/NativeTokenEscrow.*

echo "Copying contract artifacts..."
cp artifacts/contracts/NativeTokenEscrow.sol/NativeTokenEscrow.json ../../frontend/public/src/contracts/escrow/artifacts/NativeTokenEscrow.json
cp artifacts/contracts/NativeTokenEscrow.sol/NativeTokenEscrow.json ../../backend/src/contracts/escrow/artifacts/NativeTokenEscrow.json

echo "---Deployment complete---"