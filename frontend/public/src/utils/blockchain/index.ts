import { BigNumberish } from 'ethers';
import { Connector } from 'wagmi';
import Decimal from 'decimal.js';

export const getChainNameById = (id: number) => {
  switch (id) {
    case 1:
      return 'Ethereum';
    case 137:
      return 'Polygon';
    case 1337:
      return 'Localhost';
    default:
      return `Chain-${id}`;
  }
};

export const getWalletType = (
  connector: Connector
): 'MetaMask' | 'WalletConnect' | 'Brave' | 'Unknown' => {
  const name = connector.name.toLowerCase();

  if (name.includes('metamask')) return 'MetaMask';
  if (name.includes('walletconnect')) return 'WalletConnect';
  if (name.includes('brave')) return 'Brave';
  return 'Unknown';
};

export const isSupportedChain = (
  id: number | undefined,
  supportedChainIds: { chainId: number }[]
): boolean => {
  return id != null && supportedChainIds.some((chain) => chain.chainId === id);
};

export const floatToStringWithoutDot = (num: string) => {
  return num.toString().replace('.', '');
};

export const toTokenUnits = (
  amount: string | number,
  decimals: number,
  extendedBy?: number
): bigint => {
  const decimalAmount = new Decimal(amount.toString());
  const rounded = decimalAmount.toDecimalPlaces(decimals, Decimal.ROUND_DOWN);
  const baseUnitsDecimal = rounded.times(new Decimal(10).pow(decimals));
  const baseUnits = extendedBy
    ? baseUnitsDecimal.times(extendedBy).toFixed(0)
    : baseUnitsDecimal.toFixed(0);
  return BigInt(baseUnits);
};

export const toTokenUnitsConvert = (
  amount: string | number,
  decimals: number
): bigint => {
  console.log({ amount, decimals });
  const decimalAmount = new Decimal(amount.toString());
  const rounded = decimalAmount.toDecimalPlaces(decimals, Decimal.ROUND_DOWN);
  const baseUnitsDecimal = rounded.times(new Decimal(10).pow(decimals));
  const baseUnits = baseUnitsDecimal.toFixed(0);
  return BigInt(baseUnits);
};
