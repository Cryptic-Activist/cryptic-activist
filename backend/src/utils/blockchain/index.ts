import { Decimal } from '@prisma/client/runtime/library';
import { ethers } from 'ethers';

export const convertSmartContractParams = (param: number) => {
  return parseInt((param * 100).toString());
};

export const parseEthersUnits = (amount: Decimal, decimals: number) => {
  return ethers.parseUnits(amount.toFixed(decimals), decimals);
};

export const toTokenUnits = (
  amount: string | number,
  decimals: number,
): bigint => {
  console.log({ amount, decimals });
  const decimalAmount = new Decimal(amount.toString());
  const rounded = decimalAmount.toDecimalPlaces(decimals, Decimal.ROUND_DOWN);
  const baseUnitsDecimal = rounded.times(new Decimal(10).pow(decimals));
  const baseUnits = baseUnitsDecimal.times(1.5).toFixed(0);
  return BigInt(baseUnits);
};
