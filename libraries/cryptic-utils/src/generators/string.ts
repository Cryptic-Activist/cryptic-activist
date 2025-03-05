import crypto from 'crypto';
import slugify from 'slugify';
import {
  adjectives,
  animals,
  Config,
  uniqueNamesGenerator,
} from 'unique-names-generator';

export function generateRandomNames(): string[] {
  const customConfig: Config = {
    dictionaries: [adjectives, animals],
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
