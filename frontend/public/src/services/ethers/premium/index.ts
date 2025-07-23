import { BACKEND, ETHEREUM_NETWORK_URL } from '@/constants/envs';
import { Interface, ethers } from 'ethers';

import { Period } from '@/hooks/usePremium/types';
import PremiumArtifact from '@/contracts/premium/artifacts/PremiumSubscriptionManager.json';
import { TX_CODE } from './types';
import { fetchGet } from '@/services/axios';
import { getBearerToken } from '@/utils';

const iface = new Interface(PremiumArtifact.abi);

export const getPremiumABI = async () => {
  try {
    const bearerToken = getBearerToken();
    const response = await fetchGet(
      BACKEND + '/blockchains/smart-contracts/premium/abi',
      { Authorization: bearerToken }
    );

    if (response.status !== 200) {
      return null;
    }

    return response.data;
  } catch (_error) {
    return null;
  }
};

export const getProvider = () => {
  try {
    if (typeof window !== 'undefined' && window.ethereum) {
      return new ethers.BrowserProvider(window.ethereum);
    }

    // Fallback: local hardhat or RPC provider
    return new ethers.JsonRpcProvider(ETHEREUM_NETWORK_URL);
  } catch (_error) {
    throw new Error('Unable to get Provider');
  }
};

export const getSigner = async () => {
  try {
    const provider = getProvider();

    // If using BrowserProvider (MetaMask), get signer normally
    if (provider instanceof ethers.BrowserProvider) {
      await provider.send('eth_requestAccounts', []);
      return await provider.getSigner();
    }

    // If using JsonRpcProvider (e.g., localhost), fall back to account 0
    return await provider.getSigner(0);
  } catch (_error) {
    throw new Error('Unable to get signer');
  }
};

export const getPremiumContract = async (contractDetails: any) => {
  try {
    if (!contractDetails.abi || !contractDetails.address) {
      throw new Error('Premium contract details are not available');
    }

    const signer = await getSigner();
    const contract = new ethers.Contract(
      contractDetails.address,
      contractDetails.abi,
      signer
    );

    return contract;
  } catch (_error) {
    return null;
  }
};

export const decodeFunctionData = (receipt: any) => {
  for (const log of receipt.logs) {
    try {
      const parsedLog = iface.parseLog(log);
      if (parsedLog) {
        switch (parsedLog.name) {
          case 'SubscriptionActivated': {
            return parsedLog.args.toObject();
          }
          case 'SubscriptionRenewed': {
            return parsedLog.args.toObject();
          }
          case 'PriceUpdated': {
            return parsedLog.args.toObject();
          }
          case 'PaymentTokenUpdated': {
            return parsedLog.args.toObject();
          }
          case 'PlatformWalletUpdated': {
            return parsedLog.args.toObject();
          }
        }
      }
    } catch (_error) {
      continue;
    }
  }
};

export const subscribeToPremium = async (
  contractDetails: any,
  period: Period
) => {
  try {
    const contract = await getPremiumContract(contractDetails);

    if (!contract) {
      return {
        error: {
          code: TX_CODE.NO_CONTRACT_FOUND,
        },
      };
    }

    // Buyer deposits require sending value along with the transaction.
    const tx = await contract.subscribe(period);

    const receipt = await tx.wait();
    const decoded = decodeFunctionData(receipt);

    console.log({ tx, receipt, decoded });

    return {
      tx,
      receipt,
      data: decoded,
      txHash: tx.hash,
      message: 'Seller funded the trade successfully',
    };
  } catch (error: any) {
    return {
      message: 'Error seller funding trade',
      error: error,
    };
  }
};
