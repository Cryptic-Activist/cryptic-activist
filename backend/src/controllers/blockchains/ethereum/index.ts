import { Request, Response } from 'express';

import { ETHEREUM_ESCROW_ADDRESS } from '@/constants/env';
import { getEscrowContract } from '@/services/blockchains/ethereum';

export const getEscrowContractController = async (
  req: Request,
  res: Response,
) => {
  try {
    const contract = getEscrowContract(ETHEREUM_ESCROW_ADDRESS);

    res.status(200).json({ contract });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const initTrade = async (req: Request, res: Response) => {
  try {
    const {
      buyer,
      seller,
      arbitrator,
      cryptoAmount,
      buyerCollateral,
      sellerCollateral,
      depositDuration,
      confirmationDuration,
      disputeTimeout,
      feeRate,
      platformWallet,
    } = req.body;

    const contract = getEscrowContract(ETHEREUM_ESCROW_ADDRESS);

    const tx = await contract.initTrade(
      buyer,
      seller,
      arbitrator,
      cryptoAmount,
      buyerCollateral,
      sellerCollateral,
      depositDuration,
      confirmationDuration,
      disputeTimeout,
      feeRate,
      platformWallet,
    );
    await tx.wait();
    res.json({ message: 'Trade initialized', txHash: tx.hash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const depositByBuyer = async (req: Request, res: Response) => {
  try {
    const { value } = req.body;
    const contract = getEscrowContract(ETHEREUM_ESCROW_ADDRESS);
    // Buyer deposits require sending value along with the transaction.
    const tx = await contract.depositByBuyer({ value });
    await tx.wait();
    res.json({ message: 'Buyer deposit successful', txHash: tx.hash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const depositBySeller = async (req: Request, res: Response) => {
  try {
    const { value } = req.body;
    const contract = getEscrowContract(ETHEREUM_ESCROW_ADDRESS);
    const tx = await contract.depositBySeller({ value });
    await tx.wait();
    res.json({ message: 'Seller deposit successful', txHash: tx.hash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const confirmFiatSent = async (req: Request, res: Response) => {
  try {
    const contract = getEscrowContract(ETHEREUM_ESCROW_ADDRESS);
    const tx = await contract.confirmFiatSent();
    await tx.wait();
    res.json({ message: 'Fiat sent confirmed', txHash: tx.hash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const confirmFiatReceived = async (req: Request, res: Response) => {
  try {
    const contract = getEscrowContract(ETHEREUM_ESCROW_ADDRESS);
    const tx = await contract.confirmFiatReceived();
    await tx.wait();
    res.json({ message: 'Fiat received confirmed', txHash: tx.hash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const releaseTrade = async (req: Request, res: Response) => {
  try {
    const contract = getEscrowContract(ETHEREUM_ESCROW_ADDRESS);
    const tx = await contract.releaseTrade();
    await tx.wait();
    res.json({ message: 'Trade released', txHash: tx.hash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const cancelTrade = async (req: Request, res: Response) => {
  try {
    const contract = getEscrowContract(ETHEREUM_ESCROW_ADDRESS);
    const tx = await contract.cancelTrade();
    await tx.wait();
    res.json({ message: 'Trade cancelled', txHash: tx.hash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const raiseDispute = async (req: Request, res: Response) => {
  try {
    const contract = getEscrowContract(ETHEREUM_ESCROW_ADDRESS);
    const tx = await contract.raiseDispute();
    await tx.wait();
    res.json({ message: 'Dispute raised', txHash: tx.hash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const escalateDispute = async (req: Request, res: Response) => {
  try {
    const contract = getEscrowContract(ETHEREUM_ESCROW_ADDRESS);
    const tx = await contract.escalateDispute();
    await tx.wait();
    res.json({
      message: 'Dispute escalated - trade cancelled',
      txHash: tx.hash,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const resolveDispute = async (req: Request, res: Response) => {
  try {
    const { decision, penalizedParty } = req.body;
    const contract = getEscrowContract(ETHEREUM_ESCROW_ADDRESS);
    const tx = await contract.resolveDispute(decision, penalizedParty);
    await tx.wait();
    res.json({ message: 'Dispute resolved', txHash: tx.hash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
