npx hardhat run scripts/deploy.premium.hardhat.js --network localhost 

echo "Emptying contracts folder..."
rm -rf ../../frontend/public/src/contracts/premium/artifacts/PremiumSubscriptionManager.*

echo "Copying contract artifacts..."
cp artifacts/contracts/PremiumSubscriptionManager.sol/PremiumSubscriptionManager.json ../../frontend/public/src/contracts/premium/artifacts/PremiumSubscriptionManager.json

echo "---Deployment complete---"