npx hardhat run scripts/deploy.erc20.escrow.hardhat.js --network localhost 

echo "Emptying contracts folder..."
rm -rf ../../frontend/public/src/contracts/escrow/artifacts/ERC20Escrow.*
rm -rf ../../backend/src/contracts/escrow/artifacts/ERC20Escrow.*

echo "Copying contract artifacts..."
cp artifacts/contracts/ERC20Escrow.sol/ERC20Escrow.json ../../frontend/public/src/contracts/escrow/artifacts/ERC20Escrow.json
cp artifacts/contracts/ERC20Escrow.sol/ERC20Escrow.json ../../backend/src/contracts/escrow/artifacts/ERC20Escrow.json

echo "---Deployment complete---"