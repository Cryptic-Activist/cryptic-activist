import {
  BACKEND,
  ETHEREUM_ESCROW_CONTRACT_ADDRESS,
  ETHEREUM_NETWORK_URL,
} from '@/constants/envs';
import { BrowserProvider, Interface, ethers } from 'ethers';

import { ABI } from '@/store/abis/types';
import EscrowArtifact from '@/contracts/escrow/artifacts/MultiTradeEscrow.json';
import { TX_CODE } from './types';
import { fetchGet } from '@/services/axios';
import { getBearerToken } from '@/utils';

const iface = new Interface(EscrowArtifact.abi);

export const getEscrowABI = async () => {
  try {
    const bearerToken = getBearerToken();
    const response = await fetchGet(
      BACKEND + '/blockchains/smart-contracts/escrow/abi',
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

export const getEscrowContract = async (abi: any) => {
  try {
    const signer = await getSigner();
    const contract = new ethers.Contract(
      ETHEREUM_ESCROW_CONTRACT_ADDRESS,
      abi,
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
  abi: ABI
) => {
  try {
    const contract = await getEscrowContract(abi);

    if (!contract) {
      return {
        error: {
          code: TX_CODE.NO_CONTRACT_FOUND,
        },
      };
    }

    // Buyer deposits require sending value along with the transaction.
    const tx = await contract.sellerFundTrade(tradeId, {
      value,
    });
    const receipt = await tx.wait();
    const decoded = decodeFunctionData(receipt);

    return {
      tx,
      data: decoded,
      txHash: tx.hash,
      message: 'Seller funded the trade successfully',
    };
  } catch (error: any) {
    return {
      message: 'Error seller funding trade',
      error: error,
    };
  }
};

export const buyerFundTrade = async (
  tradeId: number,
  value: bigint,
  abi: ABI
) => {
  try {
    const contract = await getEscrowContract(abi);

    if (!contract) {
      return {
        error: {
          code: TX_CODE.NO_CONTRACT_FOUND,
        },
      };
    }

    // Buyer deposits require sending value along with the transaction.
    const tx = await contract.buyerFundTrade(tradeId, {
      value,
    });
    const receipt = await tx.wait();
    const decoded = decodeFunctionData(receipt);

    return {
      tx,
      data: decoded,
      txHash: tx.hash,
      message: 'Seller funded the trade successfully',
    };
  } catch (error: any) {
    return {
      message: 'Error buyer funding trade',
      error: error,
    };
  }
};

export async function getWalletTokenBalances(
  tokens: any[],
  provider: BrowserProvider,
  abi: any,
  walletAddress: string
) {
  const signer = await provider.getSigner();

  const balances = await Promise.all(
    tokens.map(async (token) => {
      const contract = new ethers.Contract(token.address, abi, signer);
      const raw = await contract.balanceOf(walletAddress);
      const formatted = ethers.formatUnits(raw, token.decimals);
      return {
        symbol: token.symbol,
        balance: formatted,
      };
    })
  );

  return balances;
}
