export const calculatePercentageIncrease = (
  amount: number,
  percentage: number
) => {
  return amount * (1 + percentage / 100);
};
