import { ETHEREUM_NETWORK_URL } from '@/constants/env';
// Import the ABI that Truffle generated (e.g., from build/contracts/Escrow.json)
import escrowArtifact from '@/contracts/ethereum/Escrow.json';
import { ethers } from 'ethers';

export function getEscrowContract(escrowAddress: `0x${string}`) {
  const provider = new ethers.JsonRpcProvider(ETHEREUM_NETWORK_URL);

  return new ethers.Contract(escrowAddress, escrowArtifact.abi, provider);
}
