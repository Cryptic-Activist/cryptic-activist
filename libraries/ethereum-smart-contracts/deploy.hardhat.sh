npx hardhat run scripts/deploy.hardhat.js --network localhost 

echo "Emptying contracts folder..."
rm -rf ../../frontend/public/src/contracts/escrow/artifacts/MultiTradeEscrow.*

echo "Copying contract artifacts..."
cp artifacts/contracts/MultiTradeEscrow.sol/MultiTradeEscrow.json ../../frontend/public/src/contracts/escrow/artifacts/MultiTradeEscrow.json

echo "---Deployment complete---"