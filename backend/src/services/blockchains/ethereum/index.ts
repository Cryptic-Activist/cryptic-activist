import { ETHEREUM_ESCROW_ADDRESS, ETHEREUM_NETWORK_URL } from '@/constants/env';

// Import the ABI that Truffle generated (e.g., from build/contracts/Escrow.json)
import escrowArtifact from '@/contracts/ethereum/Escrow.json';
import { ethers } from 'ethers';

export function getProvider() {
  const provider = new ethers.JsonRpcProvider(ETHEREUM_NETWORK_URL);
  return provider;
}

export const getEscrowContract = async () => {
  const provider = getProvider();
  const signer = await provider.getSigner();
  return new ethers.Contract(
    ETHEREUM_ESCROW_ADDRESS,
    escrowArtifact.abi,
    signer,
  );
};
