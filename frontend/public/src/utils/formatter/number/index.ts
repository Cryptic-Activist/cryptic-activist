export const roundDecimals = (number: number) => {
  return Math.round((number + Number.EPSILON) * 100) / 100;
};

export const toFixed = (number: number, decimals: number) => {
  return parseFloat(number.toFixed(decimals));
};

export const formatNumber = (
  number: number,
  minimumFractionDigits?: number,
  maximumFractionDigits?: number
) => {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(number);
};

// export const increaseValueByPercent = (value: number, percent: number) => {};
