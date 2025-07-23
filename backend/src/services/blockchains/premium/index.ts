import { Address, ContractDetails } from '../escrow/types';
import {
  ETHEREUM_DEPLOYER_PRIVATE_KEY,
  ETHEREUM_ESCROW_CONTRACT_ADDRESS,
  ETHEREUM_NETWORK_URL,
  ETHEREUM_PREMIUM_CONTRACT_ADDRESS,
} from '@/constants/env';
import { Interface, ethers, parseEther } from 'ethers';
import { convertSmartContractParams, toTokenUnits } from '@/utils/blockchain';
import { prisma, redisClient } from '@/services/db';

import { DeployPremiumSmartContractParams } from './types';
import { IS_DEVELOPMENT } from '@/constants';
import PremiumArtifact from '@/contracts/premium/artifacts/PremiumSubscriptionManager.json';
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

export const getPremiumDetails = async () => {
  const cacheKey = 'smartContracts:premium';
  let details: ContractDetails = { abi: null, address: null };

  const cachedDetails = await redisClient.get(cacheKey);

  if (cachedDetails) {
    const parsedCachedDetails = JSON.parse(cachedDetails);
    details = {
      abi: parsedCachedDetails.abi,
      address: parsedCachedDetails.address,
    };
  } else {
    const premiumSmartContract = await prisma.smartContract.findFirst({
      where: {
        isActive: true,
        metadata: {
          path: ['type'],
          equals: 'Premium',
        },
      },
      select: {
        artifactUrl: true,
        address: true,
      },
    });

    if (!premiumSmartContract) {
      throw new Error('Unable to find Premium Contract');
    }

    const response = await fetchGet(premiumSmartContract.artifactUrl);

    if (response.status !== 200) {
      throw new Error(
        `Failed to fetch ABI from ${premiumSmartContract.artifactUrl}`,
      );
    }

    details = {
      abi: response.data.abi,
      address: premiumSmartContract.address as Address,
    };
    const expiry = parseDurationToSeconds('1d');
    await redisClient.setEx(cacheKey, expiry, JSON.stringify(details));
  }

  return details;
};

export const getPremiumContract = async () => {
  const details = await getPremiumDetails();

  if (!details.abi || !details.address) {
    throw new Error('Premium contract details are not available');
  }

  const signer = getSigner();
  return new ethers.Contract(details.address, details.abi, signer);
};

export const deployPremium = async (
  params: DeployPremiumSmartContractParams,
) => {
  try {
    // Load environment variables
    const RPC_URL = params.chain.rpcUrl; // e.g. from Alchemy, Infura, etc.
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

    const token = await prisma.cryptocurrencyChain.findFirst({
      where: {
        chain: { id: params.chain.id, isTestnet: IS_DEVELOPMENT },

        cryptocurrency: {
          coingeckoId: 'usd-coin',
        },
      },
      select: {
        contractAddress: true,
      },
    });

    if (!token?.contractAddress) {
      throw new Error("Couldn't find token contract address");
    }

    const baseUnitsMonthlyPrice = toTokenUnits(params.monthlyPrice, 6);
    const baseUnitsYearlyPrice = toTokenUnits(params.monthlyPrice, 6);

    const contract = await factory.deploy(
      token?.contractAddress,
      params.platformWallet,
      baseUnitsMonthlyPrice,
      baseUnitsYearlyPrice,
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
