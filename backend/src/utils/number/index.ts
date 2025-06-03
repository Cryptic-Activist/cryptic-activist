export const formatNumberCompact = (value: number) => {
  if (value >= 1_000_000_000) {
    return (value / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  } else if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  } else if (value >= 1_000) {
    return (value / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
  } else {
    return value.toString();
  }
};

export const calculatePercentageChange = (
  current: number,
  previous: number,
) => {
  if (previous === 0) return current === 0 ? '0%' : '∞% from last month';

  const diff = ((current - previous) / previous) * 100;
  const sign = diff > 0 ? '+' : '';
  return `${sign}${diff.toFixed(1)}% from last month`;
};
