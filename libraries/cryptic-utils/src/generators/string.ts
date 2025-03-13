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
import { getRandomNumber } from './numbers';
import slugify from 'slugify';

const getDictionaries = () => {
  const randOne = getRandomNumber(0, 1);
  const randTwo = getRandomNumber(0, 4);
  const firstDicts = [adjectives, colors];
  const secondDicts = [animals, countries, languages, names, starWars];
  console.log({ randOne, randTwo });

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
    .map(
      (name: string) =>
        `${name.substring(0, 1).toUpperCase()}${name.substring(
          1,
          name.length,
        )}`,
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
