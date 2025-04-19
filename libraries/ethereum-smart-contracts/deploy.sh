npx hardhat run scripts/deploy.js --network localhost 

echo "Emptying contracts folder..."
rm -rf ../../backend/src/contracts/ethereum/artifacts/*

echo "Copying contract artifacts..."
cp artifacts/contracts/MultiTradeEscrow.sol/MultiTradeEscrow.json ../../backend/src/contracts/ethereum/artifacts/MultiTradeEscrow.json

echo "---Deployment complete---"