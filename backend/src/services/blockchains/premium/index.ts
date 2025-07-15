import {
  ETHEREUM_DEPLOYER_PRIVATE_KEY,
  ETHEREUM_ESCROW_CONTRACT_ADDRESS,
  ETHEREUM_NETWORK_URL,
  ETHEREUM_PREMIUM_CONTRACT_ADDRESS,
} from '@/constants/env';
import { Interface, ethers, parseEther } from 'ethers';
import { prisma, redisClient } from '@/services/db';

import { DeployPremiumSmartContractParams } from './types';
import PremiumArtifact from '@/contracts/premium/artifacts/PremiumSubscriptionManager.json';
import { convertSmartContractParams } from '@/utils/blockchain';
import { fetchGet } from '@/services/axios';
import { parseDurationToSeconds } from '@/utils/date';

const iface = new Interface(PremiumArtifact.abi);

export const getProvider = () => {
  const provider = new ethers.JsonRpcProvider(ETHEREUM_NETWORK_URL);
  return provider;
};

export const getSigner = () => {
  const provider = getProvider();
  const signer = new ethers.Wallet(ETHEREUM_DEPLOYER_PRIVATE_KEY, provider);
  return signer;
};

export const getPremiumABI = async () => {
  const cacheKey = 'smartContracts:premium';
  let abiJson: any | null = null;

  const cachedABI = await redisClient.get(cacheKey);

  if (cachedABI) {
    abiJson = JSON.parse(cachedABI);
  } else {
    const escrowSmartContract = await prisma.smartContract.findFirst({
      where: {
        isActive: true,
        metadata: {
          path: ['type'],
          equals: 'Premium',
        },
      },
      select: {
        artifactUrl: true,
      },
    });

    if (!escrowSmartContract) {
      throw new Error('Unable to find Premium ABI');
    }

    const response = await fetchGet(escrowSmartContract.artifactUrl);
    if (response.status !== 200) {
      throw new Error(
        `Failed to fetch ABI from ${escrowSmartContract.artifactUrl}`,
      );
    }

    abiJson = await response.data.abi;
    const expiry = parseDurationToSeconds('1w');
    await redisClient.setEx(cacheKey, expiry, JSON.stringify(abiJson));
  }

  return abiJson;
};

export const getPremiumContract = async () => {
  const abi = await getPremiumABI();
  const signer = getSigner();
  return new ethers.Contract(ETHEREUM_ESCROW_CONTRACT_ADDRESS, abi, signer);
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
      artifact: PremiumArtifact,
    };
  } catch (error) {
    console.log(error);
    throw new Error('Unable to deploy Premium');
  }
};
