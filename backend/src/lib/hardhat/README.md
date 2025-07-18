# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```

# How to deploy Smart Contract

Ethereum Local (For Testing only)
```
npx hardhat run scripts/deploy.js --network localhost
```

Linea zkEVM-based rollup (Option for Production deployment)
```
npx hardhat run scripts/deploy.js --network linea_mainnet
```

## IMPORTANT

Add other deployment options:
- Polygon: An Ethereum sidechain offering low fees and high throughput.

- Base: Coinbase’s L2 built on the OP Stack.

- Linea: A zkEVM-based rollup.

- zkSync and StarkNet: Zero-knowledge rollups with unique deployment models.