export type StartTradeTimer = (
  tradeId: string,
  durationSeconds: number,
  onExpire: (expiredTradeId: string) => void,
) => void;
