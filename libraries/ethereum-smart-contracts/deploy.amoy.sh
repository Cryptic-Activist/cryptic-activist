npx hardhat run scripts/deploy.amoy.js --network amoy 

echo "Emptying contracts folder..."
rm -rf ../../backend/src/contracts/ethereum/artifacts/MultiTradeEscrow.*

echo "Copying contract artifacts..."
cp artifacts/contracts/MultiTradeEscrow.sol/MultiTradeEscrow.json ../../backend/src/contracts/ethereum/artifacts/MultiTradeEscrow.json

echo "---Deployment complete---"