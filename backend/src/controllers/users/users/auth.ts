import {
  associateUserToLanguage,
  createLanguage,
  createUser,
  getUser,
  updateUser,
} from 'base-ca';
import bcrypt from 'bcryptjs';
import {
  decodeToken,
  generatePrivateKeysBip39,
  generateRefreshToken,
  generateToken,
  generateUniqueUsername,
  sanitize,
} from 'cryptic-utils';
import { Request, Response } from 'express';

import { JWT_SECRET } from '../../constants/env';
import { assignSafeUserData } from '../../utils/responses/users';
import { validateUsername } from '../../utils/validators';
import { getRandomHighContrastColor } from '@/utils/color';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  console.log({ username, password });

  try {
    const errors: string[] = [];

    const user = await getUser({ username }, {});

    if (!user) {
      errors.push('User not found');
    }

    if (errors.length > 0) {
      return res.status(400).send({
        errors,
      });
    }

    bcrypt.compare(password, user!.password, (compareError, isMatch) => {
      if (compareError) {
        return res.status(400).send({
          errors: [compareError.message],
        });
      }

      if (isMatch) {
        if (!user!.isVerified) {
          return res.status(401).send({
            errors: ['Account is not verified'],
          });
        }

        const accessToken: string = generateToken(
          { userId: user!.id },
          JWT_SECRET,
          '1d',
        );
        const refreshToken: string = generateRefreshToken(
          { userId: user!.id },
          JWT_SECRET,
        );

        return res.status(200).send({
          accessToken,
          refreshToken,
        });
      }

      return res.status(400).send({
        errors: ['Invalid credentials'],
      });
    });
  } catch (err) {
    return res.status(500).send({
      errors: [err.message],
    });
  }
};

export async function loginDecodeToken(
  req: Request,
  res: Response,
): Promise<Response> {
  const { accessToken } = req.params;

  try {
    const decoded = decodeToken(accessToken, JWT_SECRET);

    if (!decoded) {
      return res.status(401).send({
        errors: ['Unable to decode the token'],
      });
    }

    const user = await getUser(
      { id: decoded.userId as string },
      { userLanguage: true },
    );

    if (!user) {
      return res.status(404).send({
        errors: ['User not found'],
      });
    }

    // @ts-ignore
    const safeUser = await assignSafeUserData(user);

    return res.status(200).send({
      ...safeUser,
    });
  } catch (err) {
    return res.status(500).send({
      errors: [err.message],
    });
  }
}

export async function register(req: Request, res: Response): Promise<Response> {
  const { names, username, password } = req.body;

  try {
    const errors: string[] = [];

    const cleanBody = sanitize({ ...names, username }, []);

    const usernameValidation = await validateUsername(cleanBody.username);

    if (!usernameValidation.valid) {
      cleanBody.username = generateUniqueUsername(cleanBody.username);
    }

    if (errors.length > 0) {
      return res.status(400).send({
        errors,
      });
    }

    const generatedSalt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(password, generatedSalt);

    const privateKeysArrObj = await generatePrivateKeysBip39();

    const profileColor = getRandomHighContrastColor();

    const user = await createUser({
      firstName: cleanBody.firstName,
      lastName: cleanBody.lastName,
      username: cleanBody.username,
      password: hash,
      privateKeys: privateKeysArrObj.encryptedPrivateKeys,
      profileColor,
    });

    const language = await createLanguage({ name: 'English' });

    await associateUserToLanguage({ userId: user.id, languageId: language.id });

    return res.status(201).send({
      privateKeys: privateKeysArrObj.privateKeys,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      errors: [err.message],
    });
  }
}

export async function verifyPrivateKeys(
  req: Request,
  res: Response,
): Promise<Response> {
  const { username, privateKeys } = req.body;

  try {
    const user = await getUser({ username }, {});

    if (!user) {
      return res.status(400).send({
        errors: ['User not found'],
      });
    }

    if (user.isVerified) {
      return res.status(401).send({
        errors: ['You have already verified your account'],
      });
    }

    user.privateKeys.forEach(async (privateKey, index) => {
      if (!(await bcrypt.compare(privateKeys[index], privateKey))) {
        return res.status(400).send({
          errors: ['Private keys combination does not exist.'],
        });
      }
    });

    await updateUser({ id: user.id }, { isVerified: true });

    return res.status(200).send({});
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      errors: [err.message],
    });
  }
}
