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
