import { Decimal } from '@prisma/client/runtime/library';
import { ethers } from 'ethers';

export const convertSmartContractParams = (param: number) => {
  return parseInt((param * 100).toString());
};

export const parseEthersUnits = (amount: Decimal, decimals: number) => {
  return ethers.parseUnits(amount.toFixed(decimals), decimals);
};
