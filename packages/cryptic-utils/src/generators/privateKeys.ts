import bcrypt from 'bcryptjs';
import { generateMnemonic } from 'bip39';
import { generateRandomAdjective } from './string';
import { getUser } from 'base-ca';

export const encryptPrivateKey = async (key: string): Promise<string> => {
  const genSalt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(key, genSalt);

  return hashed;
};

export const generatePrivateKeys = async (): Promise<{
  privateKeys: string[];
  encryptedPrivateKeys: string[];
}> => {
  let encryptedPrivateKeysArr: null | string[];
  let privateKeysArr: null | string[];
  let userObj: any;

  do {
    privateKeysArr = [];
    encryptedPrivateKeysArr = [];

    for (let i = 0; i < 24; i += 1) {
      const generatedRandomAdjective: string = generateRandomAdjective();

      const encrypted: string = await encryptPrivateKey(
        generatedRandomAdjective,
      );

      privateKeysArr.push(generatedRandomAdjective);
      encryptedPrivateKeysArr.push(encrypted);
    }

    userObj = await getUser({
      where: {
        privateKeys: {
          equals: privateKeysArr,
        },
      },
    });
  } while (userObj);

  return {
    privateKeys: privateKeysArr,
    encryptedPrivateKeys: encryptedPrivateKeysArr,
  };
};

export const generatePrivateKeysBip39 = async () => {
  const mnemonicArr: string[] = generateMnemonic().split(' ');
  const encryptedArrPromise = mnemonicArr.map(async (mnemonic) => {
    const encrypted = await encryptPrivateKey(mnemonic);
    return encrypted;
  });

  const promised = await Promise.all(encryptedArrPromise);

  return {
    privateKeys: mnemonicArr,
    encryptedPrivateKeys: promised,
  };
};
