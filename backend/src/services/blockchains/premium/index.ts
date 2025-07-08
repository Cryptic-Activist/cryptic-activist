import {
  ETHEREUM_DEPLOYER_PRIVATE_KEY,
  ETHEREUM_NETWORK_URL,
  ETHEREUM_PREMIUM_CONTRACT_ADDRESS,
} from '@/constants/env';
import { Interface, ethers, parseEther } from 'ethers';

import premium from '@/contracts/premium/artifacts/PremiumSubscriptionManager.json';

const iface = new Interface(premium.abi);

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
    premium.abi,
    signer,
  );
};
