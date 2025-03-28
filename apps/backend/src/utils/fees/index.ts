import { CalculateFeeParams } from './types';

export const calculateTradingFee = ({
  isPremium,
  tradingFee,
  amount,
  premiumDiscount,
  price,
}: CalculateFeeParams) => {
  let fee = tradingFee;
  if (isPremium) {
    fee = Math.max(0, tradingFee - premiumDiscount); // Ensure non-negative
  }
  return tradingFee * amount * price; // Fee in quote currency
};
