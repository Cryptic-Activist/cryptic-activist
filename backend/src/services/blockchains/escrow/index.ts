import {
  DeployEscrowSmartContractParams,
  InitTradeParams,
  Token,
} from './types';
import {
  ETHEREUM_DEPLOYER_PRIVATE_KEY,
  ETHEREUM_ESCROW_ARBITRATOR_ADDRESS,
  ETHEREUM_ESCROW_CONTRACT_ADDRESS,
  ETHEREUM_NETWORK_URL,
} from '@/constants/env';
import {
  Interface,
  InterfaceAbi,
  ethers,
  parseEther,
  parseUnits,
} from 'ethers';
import { prisma, redisClient } from '@/services/db';
import semver, { ReleaseType } from 'semver';

import { Address } from './types';
import { Decimal } from '@/services/db';
import EscrowArtifact from '@/contracts/escrow/artifacts/MultiTradeEscrow.json';
import { MockToken } from '@/contracts';
import { convertSmartContractParams } from '@/utils/blockchain';
import { fetchGet } from '@/services/axios';
import { getSetting } from '@/utils/settings';
import { parseDurationToSeconds } from '@/utils/date';

const iface = new Interface(EscrowArtifact.abi);

export const getProvider = () => {
  const provider = new ethers.JsonRpcProvider(ETHEREUM_NETWORK_URL);
  return provider;
};

export const getSigner = () => {
  const provider = getProvider();
  const signer = new ethers.Wallet(ETHEREUM_DEPLOYER_PRIVATE_KEY, provider);
  return signer;
};

export const getEscrowABI = async () => {
  const cacheKey = 'smartContracts:escrow';
  let abiJson: any | null = null;

  const cachedABI = await redisClient.get(cacheKey);

  if (cachedABI) {
    abiJson = JSON.parse(cachedABI);
  } else {
    const escrowSmartContract = await prisma.smartContract.findFirst({
      where: {
        isActive: true,
        metadata: {
          path: ['type'],
          equals: 'Escrow',
        },
      },
      select: {
        artifactUrl: true,
      },
    });

    if (!escrowSmartContract) {
      throw new Error('Unable to find Escrow ABI');
    }

    const response = await fetchGet(escrowSmartContract.artifactUrl);
    if (response.status !== 200) {
      throw new Error(
        `Failed to fetch ABI from ${escrowSmartContract.artifactUrl}`,
      );
    }

    abiJson = await response.data.abi;
    const expiry = parseDurationToSeconds('1w');
    await redisClient.setEx(cacheKey, expiry, JSON.stringify(abiJson));
  }

  return abiJson;
};

export const getEscrowContract = async () => {
  const abi = await getEscrowABI();
  const signer = getSigner();
  return new ethers.Contract(ETHEREUM_ESCROW_CONTRACT_ADDRESS, abi, signer);
};

export const deployEscrow = async (params: DeployEscrowSmartContractParams) => {
  try {
    // Load environment variables
    const RPC_URL = params.rpcUrl; // e.g. from Alchemy, Infura, etc.
    const PRIVATE_KEY = ETHEREUM_DEPLOYER_PRIVATE_KEY;

    if (!RPC_URL || !PRIVATE_KEY) {
      throw new Error('Missing RPC_URL or PRIVATE_KEY in .env');
    }

    // Initialize provider and signer
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

    const deployerAddress = await wallet.getAddress();

    // Get Contract Factory and Deploy
    const factory = new ethers.ContractFactory(
      EscrowArtifact.abi,
      EscrowArtifact.bytecode,
      wallet,
    );

    const contract = await factory.deploy(
      params.platformWallet,
      convertSmartContractParams(params.defaultFeeRate),
      convertSmartContractParams(params.defaultProfitMargin),
    );

    await contract.waitForDeployment();

    const contractAddress = await contract.getAddress();
    const deploymentTx = contract.deploymentTransaction();
    const receipt = await deploymentTx?.wait();

    return {
      contractAddress,
      deployerAddress,
      deploymentHash: deploymentTx?.hash,
      deploymentBlockHeight: receipt?.blockNumber,
      gasUsed: receipt?.gasUsed,
      gasPrice: receipt?.gasPrice,
      deployedAt: new Date(),
      artifact: EscrowArtifact,
    };
  } catch (error) {
    console.log(error);
    throw new Error('Unable to deploy Escrow');
  }
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
      console.log({ _error });
      continue;
    }
  }
};

export const createTrade = async (params: InitTradeParams) => {
  try {
    console.log({ params });
    const contract = await getEscrowContract();

    const tx = await contract.createTrade(
      params.erc20TokenAddress,
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
    console.log({ error });
    return {
      message: 'Error creating trade',
      error: error,
    };
  }
};

export const fundTrade = async (tradeId: number, value: bigint) => {
  try {
    const contract = await getEscrowContract();

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
    const contract = await getEscrowContract();
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
    const contract = await getEscrowContract();
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

export const getTokenDecimals = async ({
  tokenAddress,
}: {
  tokenAddress: string;
}) => {
  try {
    const signer = await getSigner();
    const tokenContract = new ethers.Contract(
      tokenAddress,
      MockToken.abi,
      signer,
    );

    const decimals = await tokenContract.decimals();

    return { decimals };
  } catch (error) {
    console.log({ error });
    return {
      message: 'Unable to check balances',
      error: error,
    };
  }
};

export const getMockUSDCBalances = async ({
  buyer,
  arbitrator,
  seller,
  mockUSDCAddress,
}: {
  buyer: string;
  seller: string;
  arbitrator: string;
  mockUSDCAddress: string;
}) => {
  try {
    const signer = await getSigner();
    const tokenContract = new ethers.Contract(
      mockUSDCAddress,
      MockToken.abi,
      signer,
    );

    const buyerBalance = await tokenContract.balanceOf(buyer);
    const sellerBalance = await tokenContract.balanceOf(seller);
    const arbitratorBalance = await tokenContract.balanceOf(arbitrator);

    return { buyerBalance, sellerBalance, arbitratorBalance };
  } catch (error) {
    console.log({ error });
    return {
      message: 'Unable to check balances',
      error: error,
    };
  }
};

export const getTokenAllowance = async ({
  address,
  mockUSDCAddress,
}: {
  address: string;
  mockUSDCAddress: string;
}) => {
  try {
    const signer = await getSigner();
    const tokenContract = new ethers.Contract(
      mockUSDCAddress,
      MockToken.abi,
      signer,
    );

    const allowance = await tokenContract.allowance(
      address,
      ETHEREUM_ESCROW_CONTRACT_ADDRESS,
    );

    return { allowance };
  } catch (error) {
    console.log({ error });
    return {
      message: 'Unable to check balances',
      error: error,
    };
  }
};

export const approveToken = async (
  tokenAddress: string,
  tokenABI: any,
  amountToApprove: string,
) => {
  try {
    const signer = getSigner();
    const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);
    const amount = parseEther(amountToApprove);
    const tx = await tokenContract.approve(
      ETHEREUM_ESCROW_CONTRACT_ADDRESS,
      amount,
    );
    const receipt = await tx.wait();
    return {
      message: 'Token approved!',
      receipt,
    };
  } catch (error) {
    console.log({ error });
    return {
      message: 'Token Approval failed',
      error: error,
    };
  }
};

export const cancelTrade = async (tradeId: bigint, forcedCancel = false) => {
  const contract = await getEscrowContract();
  const tx = await contract.cancelTrade(tradeId, forcedCancel);
  await tx.wait();
  return { message: 'Trade cancelled', txHash: tx.hash };
};

export const raiseDispute = async () => {
  const contract = await getEscrowContract();
  const tx = await contract.raiseDispute();
  await tx.wait();
  return { message: 'Dispute raised', txHash: tx.hash };
};

export const escalateDispute = async () => {
  const contract = await getEscrowContract();
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
  const contract = await getEscrowContract();
  const tx = await contract.resolveDispute(decision, penalizedParty);
  await tx.wait();
  return { message: 'Dispute resolved', txHash: tx.hash };
};

export const getTradeDetails = async (tradeId: bigint) => {
  const contract = await getEscrowContract();
  // Buyer deposits require sending value along with the transaction.
  const tx = await contract.getTrade(tradeId);
  await tx.wait();
  return { message: 'Trade details', txHash: tx.hash, details: tx };
};

export const getCreateTradeDetails = async (trade: any, decimals: number) => {
  try {
    // TODO:
    // Replace every Float from Prisma Schema with Decimal and make
    // the appropriate changes to the new data type.
    //
    // TODO:
    // Stop storing the amount and crypto value in WEI
    // Instead store them in Prisma Decimal type and only convert
    // them to WEI when needed.

    const decimalInt = parseInt(decimals.toString());
    const offer = await prisma.offer.findFirst({
      where: { id: trade.offerId },
      select: { timeLimit: true, offerType: true },
    });

    if (!offer) return null;

    const tradeAmount = new Decimal(trade.cryptocurrencyAmount);
    const depositRate = new Decimal(
      (await getSetting('depositPerTradePercent')) ?? 0.25,
    );

    const isBuyOffer = offer.offerType === 'buy';

    const buyerWallet = isBuyOffer
      ? trade.traderWalletAddress
      : trade.vendorWalletAddress;

    const sellerWallet = isBuyOffer
      ? trade.vendorWalletAddress
      : trade.traderWalletAddress;

    const buyerCollateral = tradeAmount.mul(depositRate);
    const sellerCollateral = tradeAmount.mul(depositRate);
    const sellerTotalFund = tradeAmount.add(sellerCollateral);

    const tradeAmountInWei = parseUnits(tradeAmount.toString(), decimalInt);
    const buyerCollateralInWei = parseUnits(
      buyerCollateral.toString(),
      decimalInt,
    );
    const sellerCollateralInWei = parseUnits(
      sellerCollateral.toString(),
      decimalInt,
    );
    const sellerTotalFundInWei = parseUnits(
      sellerTotalFund.toString(),
      decimalInt,
    );

    console.log({ sellerCollateralInWei, sellerCollateral });

    const tradeDurationInSeconds = offer.timeLimit * 60;

    // const feeRate =

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
