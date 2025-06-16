import { Request, Response } from 'express';
import {
  decodeToken,
  generateRefreshToken,
  generateToken,
} from '@/utils/generators/jwt';

import bcrypt from 'bcryptjs';
import { prisma } from '@/services/db/prisma';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const errors: string[] = [];

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

    bcrypt.compare(password, admin!.password, (compareError, isMatch) => {
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
            role: true,
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
