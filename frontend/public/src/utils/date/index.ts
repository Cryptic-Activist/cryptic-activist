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
