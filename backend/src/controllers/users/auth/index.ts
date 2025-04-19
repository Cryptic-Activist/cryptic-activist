import { Request, Response } from 'express';
import {
  associateUserToLanguage,
  countFeedbacks,
  countTrades,
  countUsers,
  createLanguage,
  createTier,
  createUser,
  createVerificationToken,
  getTrades,
  getUser,
  getUsers,
  getVerificationToken,
  updateUser,
  updateVerificationToken,
} from 'base-ca';
import { buildVerifyAccountEmail, sendEmail } from '@/services/email';
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
import { generateAccessToken } from '@/utils/generators/jwt/jwt';
import { generateRandomHash } from '@/utils/string';
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
        _count: {
          select: {
            blocked: true,
            blockers: true,
            trusted: true,
            trusters: true,
          },
        },
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        createdAt: true,
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

    // const _count = {
    //   user
    // }

    const {
      firstName: _firstName,
      lastName: _lastName,
      lastLoginAt: _lastLoginAt,
      // @ts-ignore
      _count,
      ...rest
    } = user;

    const userTradesCount = await countTrades({ where: { vendorId: user.id } });
    const userPositiveFeedbacksCount = await countFeedbacks({
      where: {
        type: 'POSITIVE',
      },
    });
    const userNeutralFeedbacksCount = await countFeedbacks({
      where: {
        type: 'NEUTRAL',
      },
    });
    const userNegativeFeedbacksCount = await countFeedbacks({
      where: {
        type: 'NEGATIVE',
      },
    });

    res.status(200).send({
      names: {
        firstName: user.firstName,
        lastName: user.lastName,
      },
      lastLoginAt,
      _count: {
        ..._count,
        trades: userTradesCount,
        feedbacks: {
          negative: userNegativeFeedbacksCount,
          neutral: userNeutralFeedbacksCount,
          positive: userPositiveFeedbacksCount,
        },
      },
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
  const { names, username, email, password } = req.body;

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

    const existingEmail = await getUser({
      where: {
        email,
      },
    });
    if (existingEmail) {
      res.status(400).send({
        errors: ['Email already exists'],
      });
      return;
    }

    let newUsername = username;

    const existingUsername = await getUser({
      where: {
        username,
      },
    });
    if (existingUsername) {
      const hash = generateRandomHash(6);
      newUsername = `${username}-${hash}`;
    }

    const user = await createUser({
      where: { id: '' },
      update: {},
      create: {
        firstName: names.firstName,
        lastName: names.lastName,
        username: newUsername,
        email,
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

    const token = generateAccessToken(user.id, '30d');
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    const newToken = await createVerificationToken({
      where: { id: '' },
      update: {},
      create: {
        token,
        expiresAt,
        isUsed: false,
      },
    });

    if (!newToken) {
      res.status(500).send({
        errors: ['Unable to create verification token'],
      });
      return;
    }

    const verifyAccountEmailBody = buildVerifyAccountEmail(user, token);
    const emailId = await sendEmail({
      from: 'accounts@crypticactivist.com',
      to: user.email,
      subject: 'Verify your account',
      html: verifyAccountEmailBody,
      text: 'Verify your account',
    });

    console.log('Email sent:', emailId);

    res.status(201).send({
      privateKeys: privateKeysArrObj.privateKeys,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
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
    const user = await getUser({ where: { username } });

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

export const verifyAccount = async (req: Request, res: Response) => {
  const { token } = req.params;

  try {
    const verificationToken = await getVerificationToken({
      where: {
        token,
      },
    });

    if (!verificationToken) {
      res.status(400).send({
        errors: ['Verification token not found'],
        redirectUrl: `/?account-verified=0`,
      });
      return;
    }

    const isInThePast = new Date(verificationToken.expiresAt) < new Date();

    if (isInThePast) {
      res.status(400).send({
        errors: ['Verification token expired'],
        redirectUrl: '/?account-verified=0',
      });
      return;
    }

    const decoded = decodeToken(token, JWT_SECRET);
    if (!decoded) {
      res.status(401).send({
        errors: ['Unable to decode the token'],
        redirectUrl: '/?account-verified=0',
      });
      return;
    }

    await updateUser({
      where: {
        id: decoded.userId as string,
      },
      toUpdate: {
        isVerified: true,
      },
    });

    await updateVerificationToken({
      where: {
        id: verificationToken.id,
      },
      toUpdate: {
        isUsed: true,
      },
    });

    res.status(200).send({
      redirectUrl: '/?account-verified=1',
    });
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
