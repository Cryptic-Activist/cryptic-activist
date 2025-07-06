npx hardhat run scripts/deploy.premium.hardhat.js --network amoy 

echo "Emptying contracts folder..."
rm -rf ../../frontend/public/src/contracts/escrow/artifacts/MultiTradeEscrow.*

echo "Copying contract artifacts..."
cp artifacts/contracts/MultiTradeEscrow.sol/MultiTradeEscrow.json ../../frontend/public/src/contracts/escrow/artifacts/MultiTradeEscrow.json

echo "---Deployment complete---"