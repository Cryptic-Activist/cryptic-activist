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

export const toBigIntSafe = (input: any) => {
  if (typeof input === 'bigint') return input;
  if (typeof input === 'string' || typeof input === 'number')
    return BigInt(input);
  if (input && typeof input === 'object' && typeof input.value === 'string')
    return BigInt(input.value);

  throw new Error('Invalid BigInt input: ' + JSON.stringify(input));
};

export const parseSafeResponse = (response: { [key: string]: any }) => {
  const stringfied = JSON.stringify(response, (_, value) =>
    typeof value === 'bigint' ? value.toString() : value,
  );
  return JSON.parse(stringfied);
};

export const formatBigInt = (bigint?: bigint | number | null) => {
  if (!bigint) return null;

  const formatterBigInt = Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formatterBigInt.format(bigint);
};
