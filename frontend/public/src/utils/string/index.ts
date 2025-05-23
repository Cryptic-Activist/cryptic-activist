import { getCookie } from '../browser';

export const toCapitalize = (string: string): string => {
  return `${string.substring(0, 1).toUpperCase()}${string.substring(
    1,
    string.length
  )}`;
};

export const toUpperCase = (text?: string) => {
  return text ? text?.toUpperCase() : '';
};

export const toLowerCase = (text: string) => {
  return text.toLowerCase();
};

export const getInitials = (firstName: string, lastName: string): string => {
  const firstInitial: string = firstName.substring(0, 1).toUpperCase();
  const lastInitial: string = lastName.substring(0, 1).toUpperCase();

  return firstInitial.concat(lastInitial);
};

export const convertStringToArrayOfStrings = (string: string): string[] => {
  const stringArr: string[] = string.trim().split(',');

  const trimmedStringArr: string[] = stringArr.map((s) => s.trim());
  return trimmedStringArr;
};

export const convertArrayOfStringsToString = (array: string[]): string => {
  const converted = array.join(', ');
  return converted;
};

export const getBearerToken = () => {
  const accessToken = getCookie('accessToken');

  if (accessToken === null) {
    throw new Error('JWT not found');
  }

  return `Bearer ${accessToken}`;
};

export const generateRandomHash = (length = 4) => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let hash = '';
  for (let i = 0; i < length; i++) {
    hash += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return hash;
};

export const convertNewlinesToBr = (input: string) =>
  input.replace(/\n/g, '<br />');
