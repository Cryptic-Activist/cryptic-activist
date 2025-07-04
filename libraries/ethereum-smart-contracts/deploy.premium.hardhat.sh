npx hardhat run scripts/deploy.premium.hardhat.js --network localhost 

echo "Emptying contracts folder..."
rm -rf ../../backend/src/contracts/ethereum/artifacts/PremiumSubscriptionManager.*

echo "Copying contract artifacts..."
cp artifacts/contracts/PremiumSubscriptionManager.sol/PremiumSubscriptionManager.json ../../backend/src/contracts/ethereum/artifacts/PremiumSubscriptionManager.json

echo "---Deployment complete---"