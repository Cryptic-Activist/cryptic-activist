export const calculatePercentageIncrease = (
  amount: number,
  percentage: number
) => {
  return amount * (1 + percentage / 100);
};

export const bigintToFloatString = (
  value: bigint,
  decimals: number = 18,
  precision: number = 6 // number of digits after decimal point
): string => {
  const factor = BigInt(10) ** BigInt(decimals);
  const whole = value / factor;
  const fraction = value % factor;

  const fractionStr = fraction
    .toString()
    .padStart(decimals, '0')
    .slice(0, precision); // Trim to desired precision

  return `${whole.toString()}.${fractionStr}`;
};

export const hasEnoughBalance = (
  requiredAmount: number,
  balance: bigint,
  decimals: number = 18,
  depositPerTradePercent: number, // e.g., 0.2 = 20%
  offerType: 'buy' | 'sell'
): boolean => {
  if (!Number.isFinite(requiredAmount)) {
    throw new Error('Invalid requiredAmount: not finite');
  }

  // Scale requiredAmount from float to bigint
  const baseAmount = BigInt(Math.floor(requiredAmount * 10 ** decimals));
  let multiplier: number;

  if (offerType === 'buy') {
    // Buyer needs only the deposit percentage (e.g., 20%)
    multiplier = Math.floor(depositPerTradePercent * 10000); // e.g., 0.2 → 2000
  } else {
    // Seller needs 100% + deposit percentage (e.g., 120%)
    multiplier = Math.floor((1 + depositPerTradePercent) * 10000); // e.g., 1.2 → 12000
  }

  const adjustedRequired = (baseAmount * BigInt(multiplier)) / BigInt(10000);

  return balance >= adjustedRequired;
};

export const getRequiredBalance = (
  requiredAmount: number,
  decimals: number = 18,
  depositPerTradePercent: number, // e.g., 0.2 = 20%
  offerType: 'buy' | 'sell'
) => {
  if (!Number.isFinite(requiredAmount)) {
    throw new Error('Invalid requiredAmount: not finite');
  }

  // Scale requiredAmount from float to bigint
  const baseAmount = BigInt(Math.floor(requiredAmount * 10 ** decimals));
  let multiplier: number;

  if (offerType === 'buy') {
    // Buyer needs only the deposit percentage (e.g., 20%)
    multiplier = Math.floor(depositPerTradePercent * 10000); // e.g., 0.2 → 2000
  } else {
    // Seller needs 100% + deposit percentage (e.g., 120%)
    multiplier = Math.floor((1 + depositPerTradePercent) * 10000); // e.g., 1.2 → 12000
  }

  const adjustedRequired = (baseAmount * BigInt(multiplier)) / BigInt(10000);
  const requiredBalance = bigintToFloatString(adjustedRequired, decimals, 8);

  return requiredBalance;
};
