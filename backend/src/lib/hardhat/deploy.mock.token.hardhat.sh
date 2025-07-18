npx hardhat run scripts/deploy.mock.token.hardhat.js --network localhost 

echo "Emptying contracts folder..."
rm -rf ../../frontend/public/src/contracts/escrow/artifacts/MockToken.*
rm -rf ../../backend/src/contracts/escrow/artifacts/MockToken.*

echo "Copying contract artifacts..."
cp artifacts/contracts/MockToken.sol/MockToken.json ../../frontend/public/src/contracts/escrow/artifacts/MockToken.json
cp artifacts/contracts/MockToken.sol/MockToken.json ../../backend/src/contracts/escrow/artifacts/MockToken.json

echo "---Deployment complete---"