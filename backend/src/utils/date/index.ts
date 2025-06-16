export const getExpiresAt = (duration: string) => {
  const durationRegex = /^(\d+)([smhdw])$/i;
  const match = duration.match(durationRegex);
  if (!match) {
    throw new Error(`Invalid duration format: ${duration}`);
  }

  const value = parseInt(match[1], 10);
  const unit = match[2].toLowerCase();

  const unitToMilliseconds = {
    s: 1000, // seconds
    m: 60 * 1000, // minutes
    h: 60 * 60 * 1000, // hours
    d: 24 * 60 * 60 * 1000, // days
    w: 7 * 24 * 60 * 60 * 1000, // weeks
  };

  const milliseconds = value * unitToMilliseconds[unit];
  return new Date(Date.now() + milliseconds);
};

export const getDuration = (startedAt: Date, endedAt: Date) => {
  const diffMs = endedAt.getTime() - startedAt.getTime();

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / (24 * 3600));
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = diffMs % 1000;

  // Build formatted string
  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0) parts.push(`${seconds}s`);
  if (milliseconds > 0) parts.push(`${milliseconds}ms`);

  let formatted = '';
  if (parts.length > 0) {
    if (parts.length === 1) {
      formatted = parts[0];
    } else {
      formatted =
        parts.slice(0, -1).join(', ') + ' and ' + parts[parts.length - 1];
    }
  } else {
    formatted = '0s';
  }

  return {
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
    formatted,
  };
};

export const getMonthBoundaries = () => {
  const now = new Date();

  const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0); // day 0 of this month = last day of last month

  return {
    now,
    startOfThisMonth,
    startOfLastMonth,
    endOfLastMonth,
  };
};

export function getTodayAndYesterdayBoundaries() {
  const now = new Date();

  const todayStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0,
  );
  const todayEnd = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59,
    999,
  );

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  const yesterdayStart = new Date(
    yesterday.getFullYear(),
    yesterday.getMonth(),
    yesterday.getDate(),
    0,
    0,
    0,
  );
  const yesterdayEnd = new Date(
    yesterday.getFullYear(),
    yesterday.getMonth(),
    yesterday.getDate(),
    23,
    59,
    59,
    999,
  );

  return {
    todayStart,
    todayEnd,
    yesterdayStart,
    yesterdayEnd,
  };
}

export const formatMinutes = (avgMinutes: number) => {
  return Math.round(avgMinutes) + 'm';
};

export const getFutureDate = (options: {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}): Date => {
  const now = new Date();
  const future = new Date(now);

  if (options.days) future.setDate(future.getDate() + options.days);
  if (options.hours) future.setHours(future.getHours() + options.hours);
  if (options.minutes) future.setMinutes(future.getMinutes() + options.minutes);
  if (options.seconds) future.setSeconds(future.getSeconds() + options.seconds);

  return future;
};
