npx hardhat run scripts/deploy.mock.usdc.hardhat.js --network localhost 

# echo "Emptying contracts folder..."
# rm -rf ../../frontend/public/src/contracts/escrow/artifacts/MockUSDC.*
# rm -rf ../../backend/src/contracts/escrow/artifacts/MockUSDC.*

# echo "Copying contract artifacts..."
# cp artifacts/contracts/MockUSDC.sol/MockUSDC.json ../../frontend/public/src/contracts/escrow/artifacts/MockUSDC.json
# cp artifacts/contracts/MockUSDC.sol/MockUSDC.json ../../backend/src/contracts/escrow/artifacts/MockUSDC.json

# echo "---Deployment complete---"