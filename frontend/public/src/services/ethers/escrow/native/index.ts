import { BACKEND, ETHEREUM_NETWORK_URL } from '@/constants/envs';
import {
  BrowserProvider,
  Interface,
  ethers,
  parseEther,
  parseUnits,
} from 'ethers';

import { Contract } from '@/store/contracts/types';
import EscrowArtifact from '@/contracts/escrow/artifacts/NativeTokenEscrow.json';
import { MockToken } from '@/contracts';
import { TX_CODE } from '../types';
import { fetchGet } from '@/services/axios';
import { getBearerToken } from '@/utils';
import { toTokenUnits } from '@/utils/blockchain';

const iface = new Interface(EscrowArtifact.abi);

export const getEscrowDetails = async () => {
  try {
    const bearerToken = getBearerToken();
    const response = await fetchGet(
      BACKEND + '/blockchains/smart-contracts/escrow/native/details',
      { Authorization: bearerToken }
    );

    if (response.status !== 200) {
      return null;
    }

    return response.data;
  } catch (_error) {
    return null;
  }
};

export const getProvider = () => {
  try {
    if (typeof window !== 'undefined' && window.ethereum) {
      return new ethers.BrowserProvider(window.ethereum);
    }

    // Fallback: local hardhat or RPC provider
    return new ethers.JsonRpcProvider(ETHEREUM_NETWORK_URL);
  } catch (_error) {
    throw new Error('Unable to get Provider');
  }
};

export const getSigner = async () => {
  try {
    const provider = getProvider();

    // If using BrowserProvider (MetaMask), get signer normally
    if (provider instanceof ethers.BrowserProvider) {
      await provider.send('eth_requestAccounts', []);
      return await provider.getSigner();
    }

    // If using JsonRpcProvider (e.g., localhost), fall back to account 0
    return await provider.getSigner(0);
  } catch (_error) {
    throw new Error('Unable to get signer');
  }
};

export const getEscrowContract = async (contractDetails: any) => {
  try {
    const signer = await getSigner();
    // const contract = new ethers.Contract(
    //   contractDetails.address,
    //   contractDetails.abi,
    //   signer
    // );

    const contract = new ethers.Contract(
      '0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9',
      EscrowArtifact.abi,
      signer
    );

    return contract;
  } catch (_error) {
    return null;
  }
};

export const decodeFunctionData = (receipt: any) => {
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

export const sellerFundTrade = async (
  tradeId: number,
  value: bigint,
  contractDetails: any
) => {
  try {
    // console.log({ tradeId, value, contractDetails });
    const contract = await getEscrowContract(contractDetails);

    if (!contract) {
      return {
        error: {
          code: TX_CODE.NO_CONTRACT_FOUND,
        },
      };
    }

    // Buyer deposits require sending value along with the transaction.
    const tx = await contract.sellerFundTrade(tradeId, {
      value: value.toString(),
    });

    const receipt = await tx.wait();
    const decoded = decodeFunctionData(receipt);

    return {
      tx,
      receipt,
      data: decoded,
      txHash: tx.hash,
      message: 'Seller funded the trade successfully',
    };
  } catch (error: any) {
    console.log({ error });
    return {
      message: 'Error seller funding trade',
      error: error,
    };
  }
};

export const buyerFundTrade = async (
  tradeId: number,
  value: bigint,
  contractDetails: any
) => {
  try {
    console.log({ tradeId, value, contractDetails });
    const contract = await getEscrowContract(contractDetails);

    if (!contract) {
      return {
        error: {
          code: TX_CODE.NO_CONTRACT_FOUND,
        },
      };
    }

    // Buyer deposits require sending value along with the transaction.
    const tx = await contract.buyerFundTrade(tradeId, {
      value: value.toString(),
    });

    const receipt = await tx.wait();
    const decoded = decodeFunctionData(receipt);

    return {
      tx,
      receipt,
      data: decoded,
      txHash: tx.hash,
      message: 'Seller funded the trade successfully',
    };
  } catch (error: any) {
    console.log({ error });
    return {
      message: 'Error buyer funding trade',
      error: error,
    };
  }
};
