import { Request, Response } from 'express';
import {
  decodeToken,
  generateRefreshToken,
  generateToken,
} from '@/utils/generators/jwt';

import { EMAIL_FROM } from '@/services/email';
import { FRONTEND_ADMIN } from '@/constants/env';
import bcrypt from 'bcryptjs';
import { buildAdminInvitation } from '@/services/email/templates/invite-admin';
import e from 'cors';
import { generateRandomHash } from '@/utils/string';
import { getExpiresAt } from '@/utils/date';
import { prisma } from '@/services/db/prisma';
import { publishToQueue } from '@/services/rabbitmq';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const admin = await prisma.admin.findFirst({
      where: {
        username,
      },
    });

    if (!admin) {
      res.status(400).send({
        error: ['Unable to login'],
      });
      return;
    }

    if (!admin.password) {
      res.status(400).send({
        errors: ['Invalid credentials'],
      });
      return;
    }

    bcrypt.compare(password, admin.password, (compareError, isMatch) => {
      if (compareError) {
        res.status(500).send({
          errors: [compareError.message],
        });
        return;
      }

      if (!isMatch) {
        res.status(400).send({
          errors: ['Invalid credentials'],
        });
        return;
      }

      if (!admin.isVerified) {
        res.status(401).send({
          errors: ['Account is not verified'],
        });
        return;
      }

      const accessToken: string = generateToken({
        objectToTokenize: { userId: admin!.id },
        expiresIn: '1d',
      });
      const refreshToken: string = generateRefreshToken(admin!.id);

      res.status(200).send({
        accessToken,
        refreshToken,
      });
    });
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
};

export async function loginDecodeToken(req: Request, res: Response) {
  const { accessToken } = req.params;

  try {
    const decoded = decodeToken(accessToken);

    if (!decoded) {
      res.status(401).send({
        error: ['Unable to decode token'],
      });
      return;
    }

    const admin = await prisma.admin.findFirst({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        roles: {
          select: {
            adminRoles: true,
          },
        },
      },
    });

    if (!admin) {
      res.status(404).send({
        errors: ['User not found'],
      });
      return;
    }

    res.status(200).send(admin);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export const inviteAdmin = async (req: Request, res: Response) => {
  const { firstName, lastName, username, email, roles: rolesArray } = req.body;

  try {
    await prisma.$transaction(async (tx) => {
      const existingEmail = await tx.admin.findFirst({
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

      const existingUsername = await tx.admin.findFirst({
        where: {
          username,
        },
      });

      if (existingUsername) {
        const hashUsername = generateRandomHash(6);
        newUsername = `${username}-${hashUsername}`;
      }

      const roles = await tx.adminRoles.findMany({
        where: {
          role: {
            in: rolesArray,
          },
        },
        select: {
          id: true,
          role: true,
        },
      });

      console.log({ roles });

      const admin = await tx.admin.create({
        data: {
          firstName,
          lastName,
          username: newUsername,
          email,
          roles: {
            create: roles.map((role) => ({
              adminRoles: {
                connect: {
                  id: role.id,
                },
              },
            })),
          },
        },
      });

      const expires = '30d';
      const token = generateToken({
        objectToTokenize: { userId: admin.id },
        expiresIn: expires,
      });
      const expiresAt = getExpiresAt(expires);
      const newToken = await tx.token.create({
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

      const verifyAccountEmailBody = buildAdminInvitation(admin, token);
      const publishedVerifyAccount = await publishToQueue('emails', {
        from: EMAIL_FROM.ACCOUNT,
        to: [
          {
            email: admin.email,
            name: `${admin.firstName} ${admin.lastName}`,
          },
        ],
        subject: 'Verify your account - Cryptic Activist Admin',
        html: verifyAccountEmailBody,
        text: 'Verify your account',
      });

      await Promise.all([publishedVerifyAccount]);

      res.status(201).send({
        ok: true,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      errors: [err.message],
    });
    return;
  }
};
