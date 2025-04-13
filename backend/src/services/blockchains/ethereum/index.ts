import {
  ETHEREUM_ESCROW_ADDRESS,
  ETHEREUM_ESCROW_PRIVATE_KEY,
  ETHEREUM_NETWORK_URL,
} from '@/constants/env';

import { InitTradeParams } from './types';
// Import the ABI that Truffle generated (e.g., from build/contracts/Escrow.json)
import escrowArtifact from '@/contracts/ethereum/Escrow.json';
import { ethers } from 'ethers';

export const getProvider = () => {
  const provider = new ethers.JsonRpcProvider(ETHEREUM_NETWORK_URL);
  return provider;
};

export const getSigner = () => {
  const provider = getProvider();
  const signer = new ethers.Wallet(ETHEREUM_ESCROW_PRIVATE_KEY, provider);
  return signer;
};

export const getEscrowContract = () => {
  const signer = getSigner();
  return new ethers.Contract(
    ETHEREUM_ESCROW_ADDRESS,
    escrowArtifact.abi,
    signer,
  );
};

export const initTrade = async (params: InitTradeParams) => {
  const contract = getEscrowContract();

  const tx = await contract.initTrade(
    params.buyer,
    params.seller,
    params.arbitrator,
    params.cryptoAmount,
    params.buyerCollateral,
    params.sellerCollateral,
    params.depositDuration,
    params.confirmationDuration,
    params.disputeTimeout,
    params.feeRate,
    params.platformWallet,
  );
  await tx.wait();
  return { message: 'Trade initialized', txHash: tx.hash };
};

export const depositByBuyer = async (value: bigint) => {
  const contract = getEscrowContract();
  // Buyer deposits require sending value along with the transaction.
  const tx = await contract.depositByBuyer({ value });
  await tx.wait();
  return { message: 'Buyer deposit successful', txHash: tx.hash };
};

export const depositBySeller = async (value: bigint) => {
  const contract = getEscrowContract();
  const tx = await contract.depositBySeller({ value });
  await tx.wait();
  return { message: 'Seller deposit successful', txHash: tx.hash };
};

export const confirmFiatSent = async () => {
  const contract = getEscrowContract();
  const tx = await contract.confirmFiatSent();
  await tx.wait();
  return { message: 'Fiat sent confirmed', txHash: tx.hash };
};

export const confirmFiatReceived = async () => {
  const contract = getEscrowContract();
  const tx = await contract.confirmFiatReceived();
  await tx.wait();
  return { message: 'Fiat received confirmed', txHash: tx.hash };
};

export const releaseTrade = async () => {
  const contract = getEscrowContract();
  const tx = await contract.releaseTrade();
  await tx.wait();
  return { message: 'Trade released', txHash: tx.hash };
};

export const cancelTrade = async () => {
  const contract = getEscrowContract();
  const tx = await contract.cancelTrade();
  await tx.wait();
  return { message: 'Trade cancelled', txHash: tx.hash };
};

export const raiseDispute = async () => {
  const contract = getEscrowContract();
  const tx = await contract.raiseDispute();
  await tx.wait();
  return { message: 'Dispute raised', txHash: tx.hash };
};

export const escalateDispute = async () => {
  const contract = getEscrowContract();
  const tx = await contract.escalateDispute();
  await tx.wait();
  return {
    message: 'Dispute escalated - trade cancelled',
    txHash: tx.hash,
  };
};

export const resolveDispute = async (
  decision: boolean,
  penalizedParty: 0 | 1 | 2,
) => {
  const contract = getEscrowContract();
  const tx = await contract.resolveDispute(decision, penalizedParty);
  await tx.wait();
  return { message: 'Dispute resolved', txHash: tx.hash };
};
