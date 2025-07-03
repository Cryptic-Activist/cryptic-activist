export const calculatePercentageIncrease = (
  amount: number,
  percentage: number
) => {
  return amount * (1 + percentage / 100);
};

export const hasEnoughBalance = (
  requiredAmount: number,
  balance: bigint,
  decimals: number = 18,
  depositPerTradePercent: number // e.g., 0.2 = 20%
): boolean => {
  if (!Number.isFinite(requiredAmount)) {
    throw new Error('Invalid requiredAmount: not finite');
  }

  // Scale requiredAmount from float to bigint
  const baseAmount = BigInt(Math.floor(requiredAmount * 10 ** decimals));

  // Apply the deposit percent multiplier (e.g., 0.2 => 12000)
  const multiplier = Math.floor((1 + depositPerTradePercent) * 10000); // e.g., 12000
  const adjustedRequired = (baseAmount * BigInt(multiplier)) / BigInt(10000);

  return balance >= adjustedRequired;
};
