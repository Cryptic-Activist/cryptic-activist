import { StartTradeTimer } from './types';

// timerManager.js
const tradeTimers = new Map();

export const startTradeTimer: StartTradeTimer = (
  tradeId,
  durationSeconds,
  onExpire,
) => {
  const startTime = Date.now();
  const expiryTime = startTime + durationSeconds * 1000;

  const interval = setInterval(() => {
    const now = Date.now();
    if (now >= expiryTime) {
      clearInterval(interval);
      tradeTimers.delete(tradeId);
      onExpire(tradeId); // e.g. cancel trade, notify users
    }
  }, 1000);

  tradeTimers.set(tradeId, {
    startTime,
    durationSeconds,
    interval,
  });
};

export const getRemainingTime = (tradeId: string) => {
  const timer = tradeTimers.get(tradeId);
  if (!timer) return null;
  const now = Date.now();
  const elapsed = Math.floor((now - timer.startTime) / 1000);
  const remaining = timer.durationSeconds - elapsed;
  return remaining > 0 ? remaining : 0;
};

export const hasTimer = (tradeId: string) => {
  return tradeTimers.has(tradeId);
};
