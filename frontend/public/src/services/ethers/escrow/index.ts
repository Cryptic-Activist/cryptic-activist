import {
  ETHEREUM_ESCROW_CONTRACT_ADDRESS,
  ETHEREUM_NETWORK_URL,
} from '@/constants/envs';
import { Interface, ethers } from 'ethers';

import EscrowArtifact from '@/contracts/escrow/artifacts/MultiTradeEscrow.json';

const iface = new Interface(EscrowArtifact.abi);

export const getProvider = () => {
  const provider = new ethers.JsonRpcProvider(ETHEREUM_NETWORK_URL);
  return provider;
};

export const getSigner = async () => {
  const provider = getProvider();
  const signer = await provider.getSigner(0);
  return signer;
};

export const getEscrowContract = async () => {
  const signer = await getSigner();
  console.log({ ETHEREUM_ESCROW_CONTRACT_ADDRESS, EscrowArtifact, signer });
  const contract = new ethers.Contract(
    ETHEREUM_ESCROW_CONTRACT_ADDRESS,
    EscrowArtifact.abi,
    signer
  );
  return contract;
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

// export const fundTrade = async (tradeId: number, value: bigint) => {
//   try {
//     const contract = getEscrowContract();

//     if (!contract) {
//       return {
//         error: 'Contract not found',
//       };
//     }

//     console.log({ contract, tradeId, value });

//     // Buyer deposits require sending value along with the transaction.
//     const tx = await contract.fundTrade(tradeId, {
//       value,
//     });
//     const receipt = await tx.wait();
//     const decoded = decodeFunctionData(receipt);

//     return {
//       data: decoded,
//       txHash: tx.hash,
//       message: 'Trade funded successfully',
//     };
//   } catch (error) {
//     console.log({ fundError: error });
//     return {
//       message: 'Error funding trade',
//       error: error,
//     };
//   }
// };

// export const confirmTrade = async (tradeId: bigint, value: bigint) => {
//   try {
//     const contract = getEscrowContract();
//     // Buyer deposits require sending value along with the transaction.
//     const tx = await contract.confirmTrade(tradeId, {
//       value,
//     });
//     const receipt = await tx.wait();
//     const decoded = decodeFunctionData(receipt);

//     return { data: decoded, txHash: tx.hash, message: 'Trade confirmed' };
//   } catch (error) {
//     return {
//       message: 'Error confirming trade',
//       error: error,
//     };
//   }
// };

// export const cancelTrade = async (tradeId: bigint, forcedCancel = false) => {
//   const contract = getEscrowContract();
//   const tx = await contract.cancelTrade(tradeId, forcedCancel);
//   await tx.wait();
//   return { message: 'Trade cancelled', txHash: tx.hash };
// };

// export const raiseDispute = async () => {
//   const contract = getEscrowContract();
//   const tx = await contract.raiseDispute();
//   await tx.wait();
//   return { message: 'Dispute raised', txHash: tx.hash };
// };

// export const escalateDispute = async () => {
//   const contract = getEscrowContract();
//   const tx = await contract.escalateDispute();
//   await tx.wait();
//   return {
//     message: 'Dispute escalated - trade cancelled',
//     txHash: tx.hash,
//   };
// };

// export const resolveDispute = async (
//   decision: boolean,
//   penalizedParty: 0 | 1 | 2
// ) => {
//   const contract = getEscrowContract();
//   const tx = await contract.resolveDispute(decision, penalizedParty);
//   await tx.wait();
//   return { message: 'Dispute resolved', txHash: tx.hash };
// };

// export const getTradeDetails = async (tradeId: bigint) => {
//   const contract = getEscrowContract();
//   // Buyer deposits require sending value along with the transaction.
//   const tx = await contract.getTrade(tradeId);
//   await tx.wait();
//   return { message: 'Trade details', txHash: tx.hash, details: tx };
// };
