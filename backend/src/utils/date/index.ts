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
