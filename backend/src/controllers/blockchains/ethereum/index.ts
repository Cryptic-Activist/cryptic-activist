import { Request, Response } from 'express';
import {
  cancelTrade,
  escalateDispute,
  getEscrowContract,
  getProvider,
  raiseDispute,
  resolveDispute,
} from '@/services/blockchains/escrow';

import { ethers } from 'ethers';

export const getEstimatedTradeCostController = async (
  _req: Request,
  res: Response,
) => {
  try {
    const contract = getEscrowContract();

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
    const estimateGasResolveDispute = await contract.resolveDispute.estimateGas(
      true,
      1,
    );

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
      estimateGasResolveDispute,
    ];

    const totalGasEstimates = estimates.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    });
    const provider = getProvider();
    const feeData = await provider.getFeeData();
    const gasPrice = feeData.gasPrice as bigint;

    // Calculate total cost in Wei
    const totalCostWei = totalGasEstimates * gasPrice;

    // Convert to ether
    const totalCostEther = ethers.formatEther(totalCostWei);

    res.status(200).json({ totalCostEther });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getEscrowContractController = async (
  _req: Request,
  res: Response,
) => {
  try {
    const contract = await getEscrowContract();

    res.status(200).json({ contract });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const cancelTradeController = async (_req: Request, res: Response) => {
  try {
    const canceledTrade = await cancelTrade();
    res.json(canceledTrade);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const raiseDisputeController = async (_req: Request, res: Response) => {
  try {
    const raisedDispute = await raiseDispute();
    res.json(raisedDispute);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const escalateDisputeController = async (
  _req: Request,
  res: Response,
) => {
  try {
    const escalatedDispute = await escalateDispute();
    res.json(escalatedDispute);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const resolveDisputeController = async (req: Request, res: Response) => {
  try {
    const { decision, penalizedParty } = req.body;
    const resolvedDispute = await resolveDispute(decision, penalizedParty);
    res.json(resolvedDispute);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
