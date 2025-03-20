import { Request, Response } from 'express';
import {
  associateUserToLanguage,
  countUsers,
  createLanguage,
  createTier,
  createUser,
  getUser,
  getUsers,
  updateUser,
} from 'base-ca';
import {
  decodeToken,
  generatePrivateKeysBip39,
  generateRefreshToken,
  generateToken,
  generateUniqueUsername,
  sanitize,
} from 'cryptic-utils';

import { JWT_SECRET } from '@/constants/env';
import bcrypt from 'bcryptjs';
import { debug } from '@/utils/logger/logger';
import { getRandomHighContrastColor } from '@/utils/color';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const errors: string[] = [];

    const user = await getUser({
      where: {
        username,
      },
    });

    if (!user) {
      errors.push('User not found');
    }

    if (errors.length > 0) {
      res.status(400).send({
        errors,
      });
      return;
    }

    bcrypt.compare(password, user!.password, (compareError, isMatch) => {
      if (compareError) {
        res.status(400).send({
          errors: [compareError.message],
        });
        return;
      }

      if (isMatch) {
        if (!user!.isVerified) {
          res.status(401).send({
            errors: ['Account is not verified'],
          });
          return;
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

        res.status(200).send({
          accessToken,
          refreshToken,
        });
        return;
      }

      res.status(400).send({
        errors: ['Invalid credentials'],
      });
      return;
    });
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
    return;
  }
};

export const loginDecodeToken = async (req: Request, res: Response) => {
  const { accessToken } = req.params;

  try {
    const decoded = decodeToken(accessToken, JWT_SECRET);

    if (!decoded) {
      res.status(401).send({
        errors: ['Unable to decode the token'],
      });
      return;
    }

    const user = await getUser({
      where: { id: decoded.userId as string },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        tier: {
          select: {
            id: true,
            name: true,
            level: true,
          },
        },
        profileColor: true,
        userLanguage: {
          select: {
            language: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      res.status(404).send({
        errors: ['User not found'],
      });
      return;
    }

    const lastLoginAt = new Date();

    await updateUser({
      where: {
        id: user.id,
      },
      toUpdate: {
        lastLoginAt,
      },
    });

    const {
      firstName: _firstName,
      lastName: _lastName,
      lastLoginAt: _lastLoginAt,
      ...rest
    } = user;

    res.status(200).send({
      names: {
        firstName: user.firstName,
        lastName: user.lastName,
      },
      lastLoginAt,
      ...rest,
    });
    return;
  } catch (err) {
    debug(err);
    res.status(500).send({
      errors: [err.message],
    });
    return;
  }
};

export const register = async (req: Request, res: Response) => {
  const { names, username, password } = req.body;

  try {
    const generatedSalt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, generatedSalt);
    const privateKeysArrObj = await generatePrivateKeysBip39();
    const profileColor = getRandomHighContrastColor();
    const tier = await createTier({
      where: {
        name: 'Bronze',
      },
      update: {},
      create: {
        name: 'Bronze',
        description: 'Bronze tier description',
        discount: 0.01,
        level: 0,
        minVolume: 100,
        tradingFee: 0.05,
      },
    });

    const user = await createUser({
      where: { id: '' },
      update: {},
      create: {
        firstName: names.firstName,
        lastName: names.lastName,
        username: username,
        password: hash,
        privateKeys: privateKeysArrObj.encryptedPrivateKeys,
        profileColor,
        tierId: tier.id,
      },
    });

    const language = await createLanguage({
      where: { name: 'English' },
      update: {},
      create: { name: 'English' },
    });

    await associateUserToLanguage({ userId: user.id, languageId: language.id });

    res.status(201).send({
      privateKeys: privateKeysArrObj.privateKeys,
    });
    return;
  } catch (err) {
    console.log({ err });
    res.status(500).send({
      errors: [err.message],
    });
    return;
  }
};

export const verifyPrivateKeys = async (req: Request, res: Response) => {
  const { username, privateKeys } = req.body;

  try {
    const user = await getUser({ where: username });

    if (!user) {
      res.status(400).send({
        errors: ['User not found'],
      });
      return;
    }

    if (user?.isVerified) {
      res.status(401).send({
        errors: ['You have already verified your account'],
      });
      return;
    }

    user?.privateKeys.forEach(async (privateKey, index) => {
      if (!(await bcrypt.compare(privateKeys[index], privateKey))) {
        res.status(400).send({
          errors: ['Private keys combination does not exist.'],
        });
        return;
      }
    });

    await updateUser({
      where: { id: user?.id },
      toUpdate: {
        isVerified: true,
      },
    });

    res.status(200).send({});
    return;
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
    return;
  }
};

export const authenticate = async (_req: Request, res: Response) => {
  try {
    res.status(200).send({ ok: true });
    return;
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
    return;
  }
};
