import { MONTHS } from '@/constants';

const parseDate = (input: string) => {
  const matches = input.match(/(\d+)/g);
  const parts = matches?.map((match) => parseInt(match));

  if (!parts) return null;

  return new Date(parts[0], parts[1] - 1, parts[2]);
};

export const formatFullDate = (date?: string) => {
  if (!date) return null;

  const parsedDate = parseDate(date);

  if (!parsedDate) return null;

  const month = MONTHS[parsedDate?.getMonth()];
  const day = parsedDate.getDate();
  const year = parsedDate.getFullYear();

  return `${month} ${day}, ${year}`;
};

export const timeSince = (dateString?: string) => {
  if (!dateString) return '';

  const date = new Date(dateString);
  const now = new Date();

  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }

  const timeDiff = now.getTime() - date.getTime();

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return 'less than a minute ago';
  } else if (minutes < 60) {
    return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
  } else if (hours < 24) {
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  } else if (days < 7) {
    return days === 1 ? '1 day ago' : `${days} days ago`;
  } else if (weeks < 52) {
    return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
  } else {
    return years === 1 ? '1 year ago' : `${years} years ago`;
  }
};

export const formatTimestamp = (timestamp: number | string) => {
  const date = new Date(timestamp);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const formatRemainingTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  const paddedMins = mins.toString().padStart(2, '0');
  const paddedSecs = secs.toString().padStart(2, '0');

  return `${paddedMins}:${paddedSecs}`;
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

const getOrdinalSuffix = (day: number) => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

export const getLocaleFullDateString = (date: Date) => {
  const day = date.getDate();
  const suffix = getOrdinalSuffix(day);
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZoneName: 'short',
  });
  const parts = formatter.formatToParts(date);
  const timeZone =
    parts.find((part) => part.type === 'timeZoneName')?.value || '';

  return `${month} ${day}${suffix}, ${year} - ${hours}:${minutes} ${timeZone}`;
};

export const getFutureDateByHours = (futureDate: Date): string => {
  const now = new Date();
  const diffMs = futureDate.getTime() - now.getTime();

  if (diffMs <= 0) return 'Overdue'; // past or now

  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays >= 1) {
    return `${diffDays}d`;
  } else if (diffHours >= 1) {
    return `${diffHours}h`;
  } else if (diffMinutes >= 1) {
    return `${diffMinutes}m`;
  } else {
    return `${diffSeconds}s`;
  }
};
