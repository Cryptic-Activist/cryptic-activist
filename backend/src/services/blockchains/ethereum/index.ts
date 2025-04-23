import {
  ETHEREUM_DEPLOYER_PRIVATE_KEY,
  ETHEREUM_ESCROW_ADDRESS,
  ETHEREUM_ESCROW_ARBITRATOR_ADDRESS,
  ETHEREUM_ESCROW_CONTRACT_ADDRESS,
  ETHEREUM_ESCROW_PRIVATE_KEY,
  ETHEREUM_NETWORK_URL,
} from '@/constants/env';
import { InitTradeParams, Token } from './types';
import { Interface, ethers, parseEther } from 'ethers';
import { abis, addresses } from './data';

import { Address } from './types';
import escrowArtifact from '@/contracts/ethereum/artifacts/MultiTradeEscrow.json';
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

export const getToken = (token: Token) => {
  const address = addresses.chainlink;
  const abi = abis.chainlink;
  const signer = getSigner();
  console.log({ address, abi, signer });
  return new ethers.Contract(address, abi, signer);
};

export const getEscrowContract = () => {
  const signer = getSigner();
  return new ethers.Contract(
    ETHEREUM_ESCROW_CONTRACT_ADDRESS,
    escrowArtifact.abi,
    signer,
  );
};

export const approveToken = async (_token: Token, amount: number) => {
  const token = getToken(_token);
  const amountWei = parseEther(amount.toString());

  const approvedTx = await token.approve(
    ETHEREUM_ESCROW_CONTRACT_ADDRESS,
    amountWei,
  );

  const approved = await approvedTx.wait();
  return approved;
};

export const decodeFunctionData = (receipt: any) => {
  for (const log of receipt.logs) {
    try {
      const parsedLog = iface.parseLog(log);
      console.log({ 'parsedLog.name': log });
      if (parsedLog) {
        switch (parsedLog.name) {
          case 'TradeCreated': {
            return parsedLog.args.toObject();
          }
          case 'TradeFunded': {
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
    } catch (error) {
      console.log({ error });
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
      params.cryptoAmount,
      params.buyerCollateral,
      params.sellerCollateral,
      params.sellerTotalDeposit,
      params.tradeDuration,
      params.feeRate,
      params.profitMargin,
    );

    const receipt = await tx.wait();
    const decoded = decodeFunctionData(receipt);

    console.log({ receipt, decoded });

    return { data: decoded, txHash: tx.hash, message: 'Trade created' };
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
    // Buyer deposits require sending value along with the transaction.
    const tx = await contract.fundTrade(tradeId, {
      value,
    });
    const receipt = await tx.wait();
    const decoded = decodeFunctionData(receipt);

    return { data: decoded, txHash: tx.hash, message: 'Trade funded' };
  } catch (error) {
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

export const getTradeDetails = async (tradeId: bigint) => {
  const contract = getEscrowContract();
  // Buyer deposits require sending value along with the transaction.
  const tx = await contract.getTrade(tradeId);
  await tx.wait();
  return { message: 'Trade details', txHash: tx.hash, details: tx };
};

export const getCreateTradeDetails = async (trade: any) => {
  const offer = await prisma.offer.findFirst({
    where: { id: trade.offerId },
    select: {
      timeLimit: true,
      offerType: true,
    },
  });

  if (!offer) {
    return null;
  }

  const isBuyOffer = offer?.offerType === 'buy';

  const buyer = isBuyOffer
    ? trade.traderWalletAddress
    : trade.vendorWalletAddress;
  const seller = isBuyOffer
    ? trade.vendorWalletAddress
    : trade.traderWalletAddress;
  const tradeDuration = offer?.timeLimit * 60; // minutes -> seconds
  const cryptoAmount = trade.cryptocurrencyAmount;
  const collateral = cryptoAmount * 0.25;
  const sellerFundAmount = cryptoAmount + collateral;

  // Converting to Wei
  const cryptoAmountWei = parseEther(cryptoAmount.toString());
  const buyerCollateralWei = parseEther(collateral.toString());
  const sellerCollateralWei = parseEther(collateral.toString());
  const sellerFundAmountWei = parseEther(sellerFundAmount.toString());

  return {
    buyer: buyer as Address,
    seller: seller as Address,
    arbitrator: ETHEREUM_ESCROW_ARBITRATOR_ADDRESS as Address,
    cryptoAmountWei,
    buyerCollateralWei,
    sellerCollateralWei,
    sellerFundAmountWei,
    tradeDuration,
    feeRate: 250,
    profitMargin: 150,
  };
};
