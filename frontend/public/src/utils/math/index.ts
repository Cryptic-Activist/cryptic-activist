export const calculatePercentageIncrease = (
  amount: number,
  percentage: number
) => {
  return amount * (1 + percentage / 100);
};

export const isFloatGreaterThanBigIntPrecise = (
  floatNum: number,
  bigIntNum: bigint
) => {
  if (!Number.isFinite(floatNum)) {
    throw new Error('Invalid float: not finite');
  }

  const floatAsBigInt = BigInt(Math.floor(floatNum)); // or Math.trunc
  return floatAsBigInt > bigIntNum;
};
