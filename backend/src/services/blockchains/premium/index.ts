import {
  ETHEREUM_DEPLOYER_PRIVATE_KEY,
  ETHEREUM_ESCROW_CONTRACT_ADDRESS,
  ETHEREUM_NETWORK_URL,
} from '@/constants/env';
import { Interface, ethers, parseEther } from 'ethers';

import premium from '@/contracts/ethereum/artifacts/PremiumSubscriptionManager.json';

const iface = new Interface(premium.abi);

export const getProvider = () => {
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
    ETHEREUM_ESCROW_CONTRACT_ADDRESS,
    premium.abi,
    signer,
  );
};
