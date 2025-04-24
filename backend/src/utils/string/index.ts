import {
  Config,
  adjectives,
  animals,
  colors,
  countries,
  languages,
  names,
  starWars,
  uniqueNamesGenerator,
} from 'unique-names-generator';

import crypto from 'crypto';
import { getRandomNumber } from '../generators/number';
import slugify from 'slugify';

export const generateRandomHash = (length = 4) => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let hash = '';
  for (let i = 0; i < length; i++) {
    hash += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return hash;
};

export const isNumber = (value: string): boolean => {
  return !isNaN(Number(value)) && value.trim() !== '';
};

export const toUpperCase = (text?: string) => {
  return text ? text?.toUpperCase() : '';
};

export const removeSpecialCharsAndNumbers = (string: string) => {
  const regex = /[^a-zA-Z]/g;
  return string.replace(regex, '');
};

const getDictionaries = () => {
  const randOne = getRandomNumber(0, 1);
  const randTwo = getRandomNumber(0, 4);
  const firstDicts = [adjectives, colors];
  const secondDicts = [animals, countries, languages, names, starWars];

  return [firstDicts[randOne], secondDicts[randTwo]];
};

export function generateRandomNames(): string[] {
  const dictionaries = getDictionaries();
  const customConfig: Config = {
    dictionaries,
    separator: ' ',
    length: 2,
  };

  const shortName: string = uniqueNamesGenerator(customConfig);
  const names = shortName
    .split(' ')
    .map((name: string) =>
      removeSpecialCharsAndNumbers(
        `${name.substring(0, 1).toUpperCase()}${name.substring(
          1,
          name.length,
        )}`,
      ),
    );

  return names;
}

export function generateRandomAdjective(): string {
  const customConfig: Config = {
    dictionaries: [adjectives],
    separator: ' ',
    length: 1,
  };

  const privateKeys: string = uniqueNamesGenerator(customConfig);

  return privateKeys;
}

export function slugifyString(string: string) {
  return slugify(string);
}

export function slugifyStringLowerCase(string: string) {
  return slugify(string).toLowerCase();
}

export function generateUniqueUsername(username: string): string {
  const hex: string = crypto.randomBytes(2).toString('hex');
  return `${username}-${hex}`;
}

export const toCapitalize = (string: string): string => {
  return `${string.substring(0, 1).toUpperCase()}${string.substring(
    1,
    string.length,
  )}`;
};
