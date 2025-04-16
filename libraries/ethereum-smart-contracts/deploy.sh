npx hardhat run scripts/deploy.js --network localhost 

echo "Emptying contracts folder..."
rm -rf ../../backend/src/contracts/ethereum/*

echo "Copying contract artifacts..."
cp artifacts/contracts/MultiTradeEscrow.sol/MultiTradeEscrow.json ../../backend/src/contracts/ethereum/MultiTradeEscrow.json

echo "---Deployment complete---"