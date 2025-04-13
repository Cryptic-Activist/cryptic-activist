import { Request, Response } from 'express';
import {
  getEscrowContract,
  getProvider,
} from '@/services/blockchains/ethereum';

import { ETHEREUM_ESCROW_ADDRESS } from '@/constants/env';

export const getEstimatedTradeCost = async (req: Request, res: Response) => {
  try {
    const contract = await getEscrowContract();

    const estimatedGasInitTrade = await contract.confirmFiatSent.estimateGas({
      buyer: '0x648BD3c2AF9061a19ecA3a05BD22f618986B6D7A',
      seller: '0xe6280056e15075C182775B44e4d7590edd631C67',
      arbitrator: '0x78953535ea5ed83dE9A4287cEAF92f225355658c',
      cryptoAmount: '1000000000000000000', // In wei (1 ether)
      buyerCollateral: '100000000000000000', // In wei (0.1 ether)
      sellerCollateral: '100000000000000000', // In wei (0.1 ether)
      depositDuration: 3600, // Seconds
      confirmationDuration: 3600, // Seconds
      disputeTimeout: 7200, // Seconds
      feeRate: 50, // Basis points (50 = 0.5%)
      platformWallet: '0x6b9929Cb4EF57175D5F19b57aA9495b14eEa8d70',
    });
    const estimateGasDepositByBuyer = await contract.depositByBuyer.estimateGas(
      { value: 100 },
    );
    const estimateGasDepositBySeller =
      await contract.depositByBuyer.estimateGas({ value: 100 });
    const estimateGasConfirmFiatSent =
      await contract.confirmFiatSent.estimateGas();
    const estimateGasConfirmFiatReceived =
      await contract.confirmFiatReceived.estimateGas();
    const estimateGasReleaseTrade = await contract.releaseTrade.estimateGas();
    const estimateGasCancelTrade = await contract.cancelTrade.estimateGas();
    const estimateGasRaiseDispute = await contract.raiseDispute.estimateGas();
    const estimateGasEscalateDispute =
      await contract.escalateDispute.estimateGas();
    // const estimateGasResolveDispute =
    //   await contract.resolveDispute.estimateGas();

    const estimates = [
      estimatedGasInitTrade,
      estimateGasDepositByBuyer,
      estimateGasDepositBySeller,
      estimateGasConfirmFiatSent,
      estimateGasConfirmFiatReceived,
      estimateGasReleaseTrade,
      estimateGasCancelTrade,
      estimateGasRaiseDispute,
      estimateGasEscalateDispute,
    ];

    const sumEstimates = estimates.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    });

    res.status(200).json({ estimate: sumEstimates.toString() });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export const getEscrowContractController = async (
  req: Request,
  res: Response,
) => {
  try {
    const contract = await getEscrowContract();

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

    const contract = await getEscrowContract();

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
    const contract = await getEscrowContract();
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
    const contract = await getEscrowContract();
    const tx = await contract.depositBySeller({ value });
    await tx.wait();
    res.json({ message: 'Seller deposit successful', txHash: tx.hash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const confirmFiatSent = async (req: Request, res: Response) => {
  try {
    const contract = await getEscrowContract();
    const tx = await contract.confirmFiatSent();
    await tx.wait();
    res.json({ message: 'Fiat sent confirmed', txHash: tx.hash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const confirmFiatReceived = async (req: Request, res: Response) => {
  try {
    const contract = await getEscrowContract();
    const tx = await contract.confirmFiatReceived();
    await tx.wait();
    res.json({ message: 'Fiat received confirmed', txHash: tx.hash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const releaseTrade = async (req: Request, res: Response) => {
  try {
    const contract = await getEscrowContract();
    const tx = await contract.releaseTrade();
    await tx.wait();
    res.json({ message: 'Trade released', txHash: tx.hash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const cancelTrade = async (req: Request, res: Response) => {
  try {
    const contract = await getEscrowContract();
    const tx = await contract.cancelTrade();
    await tx.wait();
    res.json({ message: 'Trade cancelled', txHash: tx.hash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const raiseDispute = async (req: Request, res: Response) => {
  try {
    const contract = await getEscrowContract();
    const tx = await contract.raiseDispute();
    await tx.wait();
    res.json({ message: 'Dispute raised', txHash: tx.hash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const escalateDispute = async (req: Request, res: Response) => {
  try {
    const contract = await getEscrowContract();
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
    const contract = await getEscrowContract();
    const tx = await contract.resolveDispute(decision, penalizedParty);
    await tx.wait();
    res.json({ message: 'Dispute resolved', txHash: tx.hash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
