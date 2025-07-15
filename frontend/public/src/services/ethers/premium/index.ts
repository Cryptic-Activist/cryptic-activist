import {
  BACKEND,
  ETHEREUM_ESCROW_CONTRACT_ADDRESS,
  ETHEREUM_NETWORK_URL,
} from '@/constants/envs';

import { ethers } from 'ethers';
import { fetchGet } from '@/services/axios';
import { getBearerToken } from '@/utils';

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

export const getPremiumContract = async (abi: any) => {
  try {
    const signer = await getSigner();
    const contract = new ethers.Contract(
      ETHEREUM_ESCROW_CONTRACT_ADDRESS,
      abi,
      signer
    );

    return contract;
  } catch (_error) {
    return null;
  }
};
