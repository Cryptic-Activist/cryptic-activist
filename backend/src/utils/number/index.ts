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
  if (previous === 0) {
    if (current === 0) return 'No change from last month';
    return 'New this month';
  }

  const diff = ((current - previous) / previous) * 100;
  const sign = diff > 0 ? '+' : '';
  const formatted = `${sign}${diff.toFixed(1)}%`;

  if (diff > 0) return `${formatted} since last month`;
  if (diff < 0) return `${formatted} drop from last month`;

  return 'No change from last month';
};
