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
