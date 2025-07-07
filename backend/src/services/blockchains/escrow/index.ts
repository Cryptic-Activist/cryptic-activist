import {
  ETHEREUM_DEPLOYER_PRIVATE_KEY,
  ETHEREUM_ESCROW_ARBITRATOR_ADDRESS,
  ETHEREUM_ESCROW_CONTRACT_ADDRESS,
  ETHEREUM_NETWORK_URL,
} from '@/constants/env';
import { InitTradeParams, Token } from './types';
import { Interface, ethers, parseEther } from 'ethers';

import { Address } from './types';
import escrowArtifact from '@/contracts/escrow/artifacts/MultiTradeEscrow.json';
import { getSetting } from '@/utils/settings';
import { prisma } from '@/services/db';

const iface = new Interface(escrowArtifact.abi);

export const getProvider = () => {
  const provider = new ethers.JsonRpcProvider(ETHEREUM_NETWORK_URL);
  return provider;
};

export const getSigner = () => {
  const provider = getProvider();
  const signer = new ethers.Wallet(ETHEREUM_DEPLOYER_PRIVATE_KEY, provider);
  return signer;
};

export const getEscrowContract = () => {
  const signer = getSigner();
  return new ethers.Contract(
    ETHEREUM_ESCROW_CONTRACT_ADDRESS,
    escrowArtifact.abi,
    signer,
  );
};

export const decodeFunctionData = (receipt: any) => {
  console.log({ receipt });
  for (const log of receipt.logs) {
    try {
      const parsedLog = iface.parseLog(log);
      if (parsedLog) {
        switch (parsedLog.name) {
          case 'TradeCreated': {
            return parsedLog.args.toObject();
          }
          case 'TradeFunded': {
            return parsedLog.args.toObject();
          }
          case 'SellerFunded': {
            return parsedLog.args.toObject();
          }
          case 'BuyerFunded': {
            return parsedLog.args.toObject();
          }
          case 'TradeFullyFunded': {
            return parsedLog.args.toObject();
          }
          case 'TradeExecuted': {
            return parsedLog.args.toObject();
          }
          case 'TradeConfirmed': {
            return parsedLog.args.toObject();
          }
          case 'TradeDisputed': {
            return parsedLog.args.toObject();
          }
          case 'ArbitrationResolved': {
            return parsedLog.args.toObject();
          }
          case 'TradeCompleted': {
            return parsedLog.args.toObject();
          }
          case 'TradeCancelled': {
            return parsedLog.args.toObject();
          }
        }
      }
    } catch (_error) {
      continue;
    }
  }
};

export const createTrade = async (params: InitTradeParams) => {
  try {
    const contract = getEscrowContract();

    const tx = await contract.createTrade(
      params.buyer,
      params.seller,
      params.arbitrator,
      params.tradeAmount,
      params.buyerCollateral,
      params.sellerCollateral,
      params.sellerTotalDeposit,
      params.tradeDuration,
      params.feeRate,
      params.profitMargin,
    );

    const receipt = await tx.wait();
    const decoded = decodeFunctionData(receipt);

    return {
      data: decoded,
      txHash: tx.hash,
      message: 'Trade created successfully',
    };
  } catch (error) {
    return {
      message: 'Error creating trade',
      error: error,
    };
  }
};

export const fundTrade = async (tradeId: number, value: bigint) => {
  try {
    const contract = getEscrowContract();

    if (!contract) {
      return {
        error: 'Contract not found',
      };
    }

    console.log({ contract, tradeId, value });

    // Buyer deposits require sending value along with the transaction.
    const tx = await contract.fundTrade(tradeId, {
      value,
    });
    const receipt = await tx.wait();
    const decoded = decodeFunctionData(receipt);

    return {
      data: decoded,
      txHash: tx.hash,
      message: 'Trade funded successfully',
    };
  } catch (error) {
    console.log({ fundError: error });
    return {
      message: 'Error funding trade',
      error: error,
    };
  }
};

export const confirmTrade = async (tradeId: bigint, value: bigint) => {
  try {
    const contract = getEscrowContract();
    // Buyer deposits require sending value along with the transaction.
    const tx = await contract.confirmTrade(tradeId, {
      value,
    });
    const receipt = await tx.wait();
    const decoded = decodeFunctionData(receipt);

    return { data: decoded, txHash: tx.hash, message: 'Trade confirmed' };
  } catch (error) {
    return {
      message: 'Error confirming trade',
      error: error,
    };
  }
};

export const executeTrade = async (tradeId: BigInt) => {
  try {
    const contract = getEscrowContract();
    // Buyer deposits require sending value along with the transaction.
    const tx = await contract.executeTrade(tradeId);
    const receipt = await tx.wait();
    const decoded = decodeFunctionData(receipt);

    return {
      data: decoded,
      txHash: tx.hash,
      message: 'Trade executed successfully',
    };
  } catch (error) {
    return {
      message: 'Error executing trade',
      error: error,
    };
  }
};

export const cancelTrade = async (tradeId: bigint, forcedCancel = false) => {
  const contract = getEscrowContract();
  const tx = await contract.cancelTrade(tradeId, forcedCancel);
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

export const getTradeDetails = async (tradeId: bigint) => {
  const contract = getEscrowContract();
  // Buyer deposits require sending value along with the transaction.
  const tx = await contract.getTrade(tradeId);
  await tx.wait();
  return { message: 'Trade details', txHash: tx.hash, details: tx };
};

export const getCreateTradeDetails = async (trade: any) => {
  try {
    const offer = await prisma.offer.findFirst({
      where: { id: trade.offerId },
      select: { timeLimit: true, offerType: true },
    });

    if (!offer) return null;

    const depositRate = (await getSetting('depositPerTradePercent')) ?? 0.25;

    const isBuyOffer = offer.offerType === 'buy';

    const buyerWallet = isBuyOffer
      ? trade.traderWalletAddress
      : trade.vendorWalletAddress;

    const sellerWallet = isBuyOffer
      ? trade.vendorWalletAddress
      : trade.traderWalletAddress;

    const tradeAmount = trade.cryptocurrencyAmount;
    const buyerCollateral = tradeAmount * depositRate;
    const sellerCollateral = tradeAmount * depositRate;
    const sellerTotalFund = tradeAmount + sellerCollateral;

    const tradeAmountInWei = parseEther(tradeAmount.toString());
    const buyerCollateralInWei = parseEther(buyerCollateral.toString());
    const sellerCollateralInWei = parseEther(sellerCollateral.toString());
    const sellerTotalFundInWei = parseEther(sellerTotalFund.toString());

    const tradeDurationInSeconds = offer.timeLimit * 60;

    return {
      buyerWallet: buyerWallet as Address,
      sellerWallet: sellerWallet as Address,
      arbitratorWallet: ETHEREUM_ESCROW_ARBITRATOR_ADDRESS as Address,

      tradeAmountInWei,
      buyerCollateralInWei,
      sellerCollateralInWei,
      sellerTotalFundInWei,

      tradeDurationInSeconds,
      feeRate: 250,
      profitMargin: 150,
    };
  } catch (error) {
    console.error('Error in getCreateTradeDetails:', error);
    return null;
  }
};
