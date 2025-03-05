import { roundDecimals } from '@/utils/formatter/number';

export const getTradeCryptocurrencyFee = (
  initialAmount: number,
  feePercent: number
) => {
  const percent = feePercent / 100;

  return roundDecimals(initialAmount * percent);
};
