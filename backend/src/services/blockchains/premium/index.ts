import {
  ETHEREUM_DEPLOYER_PRIVATE_KEY,
  ETHEREUM_NETWORK_URL,
  ETHEREUM_PREMIUM_CONTRACT_ADDRESS,
} from '@/constants/env';
import { Interface, ethers, parseEther } from 'ethers';

import { DeployPremiumSmartContractParams } from './types';
import PremiumArtifact from '@/contracts/premium/artifacts/PremiumSubscriptionManager.json';
import { convertSmartContractParams } from '@/utils/blockchain';

const iface = new Interface(PremiumArtifact.abi);

export const getProvider = () => {
  console.log({ ETHEREUM_NETWORK_URL });
  const provider = new ethers.JsonRpcProvider(ETHEREUM_NETWORK_URL);
  return provider;
};

export const getSigner = () => {
  const provider = getProvider();
  const signer = new ethers.Wallet(ETHEREUM_DEPLOYER_PRIVATE_KEY, provider);
  return signer;
};

export const getPremiumContract = () => {
  const signer = getSigner();
  return new ethers.Contract(
    ETHEREUM_PREMIUM_CONTRACT_ADDRESS,
    PremiumArtifact.abi,
    signer,
  );
};

export const deployPremium = async (
  params: DeployPremiumSmartContractParams,
) => {
  try {
    // Load environment variables
    const RPC_URL = params.rpcUrl; // e.g. from Alchemy, Infura, etc.
    const PRIVATE_KEY = ETHEREUM_DEPLOYER_PRIVATE_KEY;

    if (!RPC_URL || !PRIVATE_KEY) {
      throw new Error('Missing RPC_URL or PRIVATE_KEY in .env');
    }

    // Initialize provider and signer
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

    const deployerAddress = await wallet.getAddress();

    // Get Contract Factory and Deploy
    const factory = new ethers.ContractFactory(
      PremiumArtifact.abi,
      PremiumArtifact.bytecode,
      wallet,
    );

    const contract = await factory.deploy(
      params.platformWallet,
      ethers.parseUnits(params.monthlyPrice.toString()),
      ethers.parseUnits(params.yearlyPrice.toString()),
    );

    await contract.waitForDeployment();

    const contractAddress = await contract.getAddress();
    const deploymentTx = contract.deploymentTransaction();
    const receipt = await deploymentTx?.wait();

    return {
      contractAddress,
      deployerAddress,
      deploymentHash: deploymentTx?.hash,
      deploymentBlockHeight: receipt?.blockNumber,
      gasUsed: receipt?.gasUsed,
      gasPrice: receipt?.gasPrice,
      deployedAt: new Date(),
      abi: PremiumArtifact.abi,
    };
  } catch (error) {
    console.log(error);
    throw new Error('Unable to deploy Premium');
  }
};
