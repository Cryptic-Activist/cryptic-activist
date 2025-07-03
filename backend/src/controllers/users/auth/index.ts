import {
  EMAIL_FROM,
  buildResetPasswordEmail,
  buildTwoFactorAuthentication,
  buildVerifyAccountEmail,
} from '@/services/email';
import { Request, Response } from 'express';
import {
  decodeToken,
  generateRefreshToken,
  generateToken,
} from '@/utils/generators/jwt';

import QRCode from 'qrcode';
import bcrypt from 'bcryptjs';
import buildAccountCreatedEmail from '@/services/email/templates/account-created';
import { debug } from '@/utils/logger/logger';
import { generatePrivateKeysBip39 } from '@/utils/privateKeys';
import { generateRandomHash } from '@/utils/string';
import { getExpiresAt } from '@/utils/date';
import { getRandomHighContrastColor } from '@/utils/color';
import { prisma } from '@/services/db';
import { publishToQueue } from '@/services/rabbitmq';
import speakeasy from 'speakeasy';

export const login = async (req: Request, res: Response) => {
  const { usernameOrEmail, password } = req.body;

  try {
    const errors: string[] = [];

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            username: usernameOrEmail,
          },
          {
            email: usernameOrEmail,
          },
        ],
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

        if (user?.twoFactorEnabled) {
          res.status(200).send({
            userId: user.id,
            twoFactorEnabled: user.twoFactorEnabled,
          });
          return;
        }

        const accessToken: string = generateToken({
          objectToTokenize: { userId: user!.id },
          expiresIn: '1d',
        });
        const refreshToken: string = generateRefreshToken(user!.id);

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

export const login2FAVerify = async (req: Request, res: Response) => {
  const { userId, token2FA } = req.body;

  try {
    const user = await prisma.user.findFirst({ where: { id: userId } });

    if (!user) {
      res.status(400).send({
        errors: ['User not found'],
      });
      return;
    }

    if (!user.twoFactorSecret) {
      res.status(400).send({
        errors: ['Unable to verify 2fa'],
      });
      return;
    }

    const verified = speakeasy.totp.verify({
      secret: user?.twoFactorSecret,
      encoding: 'base32',
      token: token2FA,
      window: 1,
    });

    if (!verified) {
      res.status(400).json({ error: 'Invalid token' });
      return;
    }

    const accessToken: string = generateToken({
      objectToTokenize: { userId: user!.id },
      expiresIn: '1d',
    });
    const refreshToken: string = generateRefreshToken(user!.id);

    res.status(200).send({
      accessToken,
      refreshToken,
    });
    return;
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
    const decoded = decodeToken(accessToken);

    if (!decoded) {
      res.status(401).send({
        errors: ['Unable to decode the token'],
      });
      return;
    }

    const user = await prisma.user.findFirst({
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
        email: true,
        createdAt: true,
        lastLoginAt: true,
        twoFactorEnabled: true,
        referralCode: true,
        kyc: {
          where: {
            status: {
              in: ['VERIFIED', 'PENDING', 'REJECTED'],
            },
          },
          select: {
            status: true,
          },
        },
        xp: true,
        tier: {
          select: {
            id: true,
            name: true,
            level: true,
            requiredXP: true,
            discount: true,
            tradingFee: true,
            minVolume: true,
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

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        lastLoginAt,
      },
    });

    const {
      firstName: _firstName,
      lastName: _lastName,
      lastLoginAt: _lastLoginAt,
      // @ts-ignore
      _count,
      ...rest
    } = user;

    const userTradesCount = await prisma.trade.count({
      where: { vendorId: user.id },
    });

    const userPositiveFeedbacksCount = await prisma.feedback.count({
      where: {
        trade: {
          vendorId: user.id,
        },
        type: 'POSITIVE',
      },
    });
    const userNeutralFeedbacksCount = await prisma.feedback.count({
      where: {
        trade: {
          vendorId: user.id,
        },
        type: 'NEUTRAL',
      },
    });
    const userNegativeFeedbacksCount = await prisma.feedback.count({
      where: {
        trade: {
          vendorId: user.id,
        },
        type: 'NEGATIVE',
      },
    });

    res.status(200).send({
      ...rest,
      names: {
        firstName: user.firstName,
        lastName: user.lastName,
      },
      lastLoginAt,
      userLanguage: user.userLanguage,
      _count: {
        ..._count,
        trades: userTradesCount,
        feedbacks: {
          negative: userNegativeFeedbacksCount,
          neutral: userNeutralFeedbacksCount,
          positive: userPositiveFeedbacksCount,
        },
      },
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
  const { names, username, email, password, referralCode } = req.body;

  try {
    let referrerId: string | null = null;

    if (referralCode) {
      const referringUser = await prisma.user.findUnique({
        where: { referralCode },
      });
      if (!referringUser) {
        res.status(400).json({ error: 'Invalid referral code.' });
        return;
      }
      referrerId = referringUser.id;
    }

    const generatedSalt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, generatedSalt);
    const privateKeysArrObj = await generatePrivateKeysBip39();
    const profileColor = getRandomHighContrastColor();

    const tier = await prisma.tier.upsert({
      where: {
        name: 'Bronze',
      },
      update: {},
      create: {
        name: 'Bronze',
        description:
          'Your starting tier. Earn XP by trading to unlock discounts',
        level: 0,
        tradingFee: 0.05,
        discount: 0,
        minVolume: 0,
        requiredXP: 0,
      },
    });

    const existingEmail = await prisma.user.findFirst({
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

    const existingUsername = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    if (existingUsername) {
      const hashUsername = generateRandomHash(6);
      newUsername = `${username}-${hashUsername}`;
    }

    const user = await prisma.user.create({
      data: {
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

    if (referrerId) {
      await prisma.referral.create({
        data: {
          referrerId,
          refereeId: user.id,
        },
      });
    }

    const language = await prisma.language.upsert({
      where: { name: 'English' },
      update: {},
      create: { name: 'English' },
    });
    await prisma.userLanguage.create({
      data: { languageId: language.id, userId: user.id },
    });

    const expires = '30d';
    const token = generateToken({
      objectToTokenize: { userId: user.id },
      expiresIn: expires,
    });
    const expiresAt = getExpiresAt(expires);
    const newToken = await prisma.token.create({
      data: {
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
    const publishedVerifyAccount = await publishToQueue('emails', {
      from: EMAIL_FROM.ACCOUNT,
      to: [
        {
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
        },
      ],
      subject: 'Verify your account - Cryptic Activist',
      html: verifyAccountEmailBody,
      text: 'Verify your account',
    });

    const accountCreatedEmailBody = buildAccountCreatedEmail(user);
    const publishedAccountCreated = await publishToQueue('emails', {
      from: EMAIL_FROM.ACCOUNT,
      to: [
        {
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
        },
      ],
      subject: 'Account creation - Cryptic Activist',
      html: accountCreatedEmailBody,
      text: 'Account creation',
    });

    const promised = await Promise.all([
      publishedVerifyAccount,
      publishedAccountCreated,
    ]);

    console.log({ promised });

    res.status(201).send({
      privateKeys: privateKeysArrObj.privateKeys,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
    });

    return;
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
    return;
  }
};

export const verifyPrivateKeys = async (req: Request, res: Response) => {
  const { username, privateKeys } = req.body;

  try {
    const user = await prisma.user.findFirst({ where: { username } });

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

    await prisma.user.update({
      where: { id: user?.id },
      data: {
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
    const decoded = decodeToken(token);
    if (!decoded) {
      res.status(401).send({
        errors: ['Unable to decode the token'],
      });
      return;
    }

    const userToVerify = await prisma.user.findFirst({
      where: {
        id: decoded.userId,
        isVerified: false,
      },
    });

    if (!userToVerify) {
      res.status(400).send({
        error: 'Verification token is invalid',
      });
      return;
    }

    await prisma.user.update({
      where: {
        id: decoded.userId as string,
      },
      data: {
        isVerified: true,
      },
    });

    const verificationToken = await prisma.token.findFirst({
      where: {
        token,
      },
    });

    if (!verificationToken) {
      res.status(400).send({
        error: 'Verification token is invalid',
      });
      return;
    }

    await prisma.token.update({
      where: {
        id: verificationToken?.id,
      },
      data: {
        isUsed: true,
      },
    });

    res.status(200).send({
      ok: true,
    });
    return;
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
    return;
  }
};

export const resetPasswordRequest = async (req: Request, res: Response) => {
  const { unique } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: unique,
          },
          {
            username: unique,
          },
        ],
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      },
    });

    if (!user) {
      res.status(200).send({
        ok: true,
      });
      return;
    }

    const expires = '20m';
    const token = generateToken({
      objectToTokenize: { userId: user.id },
      expiresIn: expires,
    });
    const expiresAt = getExpiresAt(expires);
    const newToken = await prisma.token.create({
      data: {
        token,
        expiresAt,
        isUsed: false,
      },
    });

    if (!newToken) {
      res.status(500).send({
        errors: ['Unable to create reset password token'],
      });
      return;
    }

    const resetPasswordEmailBody = buildResetPasswordEmail(user, token);
    const publishedResetPassword = await publishToQueue('emails', {
      from: EMAIL_FROM.ACCOUNT,
      to: [
        {
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
        },
      ],
      subject: 'Password reset - Cryptic Activist',
      html: resetPasswordEmailBody,
      text: 'Reset your password',
    });

    console.log('Email sent:', publishedResetPassword);

    res.status(200).send({
      ok: true,
    });
    return;
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
    return;
  }
};

export const resetPasswordVerifyToken = async (req: Request, res: Response) => {
  const { token } = req.params;

  try {
    const decoded = decodeToken(token);
    if (!decoded) {
      res.status(401).send({
        errors: ['Unable to decode the token'],
      });
      return;
    }

    const user = await prisma.user.findFirst({
      where: {
        id: decoded.userId as string,
      },
    });

    if (!user) {
      res.status(404).send({
        errors: ['User not found'],
      });
      return;
    }

    res.status(200).send({
      ok: true,
    });
    return;
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
    return;
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = decodeToken(token);
    if (!decoded) {
      res.status(401).send({
        errors: ['Unable to decode the token'],
      });
      return;
    }

    const user = await prisma.user.findFirst({
      where: {
        id: decoded.userId as string,
      },
    });

    if (!user) {
      res.status(404).send({
        errors: ['User not found'],
      });
      return;
    }

    const generatedSalt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, generatedSalt);

    const updatedPassword = await prisma.user.update({
      where: { id: user.id },
      data: { password: hash },
    });

    if (!updatedPassword) {
      res.status(400).send({
        errors: ['Unable to reset password'],
      });
      return;
    }

    const existingToken = await prisma.token.findFirst({
      where: {
        token,
      },
      select: {
        id: true,
      },
    });

    if (!existingToken) {
      res.status(400).send({
        errors: ['Unable to find token'],
      });
      return;
    }

    const invalidatedToken = await prisma.token.update({
      where: {
        id: existingToken?.id,
      },
      data: {
        isUsed: true,
      },
    });

    if (!invalidatedToken) {
      res.status(400).send({
        errors: ['Unable to invalidate token'],
      });
      return;
    }

    res.status(200).send({
      ok: true,
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

export const generate2FA = async (req: Request, res: Response) => {
  try {
    const { userId, email } = req.body;
    const secret = speakeasy.generateSecret({
      name: 'Cryptic Activist Catalog (' + email + ')',
    });
    if (!secret.otpauth_url) {
      res.status(400).send({
        errors: ['Unable to get otpauth_url'],
      });
      return;
    }
    // Save secret.base32 to user record, encrypted
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        twoFactorSecret: secret.base32,
      },
    });

    const qrDataUrl = await QRCode.toDataURL(secret.otpauth_url);
    res.status(200).json({ qr: qrDataUrl });
    return;
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
    return;
  }
};

export const verify2FA = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { userId } = req.body;
    const user = await prisma.user.findFirst({ where: { id: userId } });

    if (!user) {
      res.status(400).send({
        errors: ['User not found'],
      });
      return;
    }

    if (!user.twoFactorSecret) {
      res.status(400).send({
        errors: ['Unable to verify 2fa'],
      });
      return;
    }

    const verified = speakeasy.totp.verify({
      secret: user?.twoFactorSecret,
      encoding: 'base32',
      token,
      window: 1,
    });

    if (!verified) {
      res.status(400).json({ error: 'Invalid token' });
      return;
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        twoFactorEnabled: true,
      },
    });

    const twoFactorActivatedEmailBody = buildTwoFactorAuthentication(user);
    const publishedTwoFactorActivated = await publishToQueue('emails', {
      from: EMAIL_FROM.ACCOUNT,
      to: [
        {
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
        },
      ],
      subject: '2FA Activatived - Cryptic Activist',
      html: twoFactorActivatedEmailBody,
      text: '2FA Activated',
    });

    console.log({ publishedTwoFactorActivated });

    res.status(200).json({ success: true });
    return;
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
    return;
  }
};

export const disable2FA = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      res.status(404).send({
        error: 'User not found',
      });
      return;
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        twoFactorSecret: null,
        twoFactorEnabled: false,
      },
    });

    res.status(200).json({ ok: true });
    return;
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
    return;
  }
};
