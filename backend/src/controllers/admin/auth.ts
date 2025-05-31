import { Request, Response } from 'express';

import { JWT_SECRET } from '@/constants/env';
import bcrypt from 'bcryptjs';
import { prisma } from '@/services/db/prisma';

// import { validateAdminUsername } from '@/utils/validators';

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
      errors.push('User not found');
    }

    if (errors.length > 0) {
      res.status(400).send({
        errors,
      });
    }

    bcrypt.compare(password, admin!.password, (compareError, isMatch) => {
      if (compareError) {
        res.status(500).send({
          errors: [compareError.message],
        });
      }

      if (isMatch) {
        if (!admin!.isVerified) {
          res.status(401).send({
            errors: ['Account is not verified'],
          });
        }

        const accessToken: string = generateToken(
          { id: admin!.id },
          JWT_SECRET,
          '1d',
        );
        const refreshToken: string = generateRefreshToken(
          { userId: admin!.id },
          JWT_SECRET,
        );

        res.status(200).send({
          accessToken,
          refreshToken,
        });
      }

      res.status(400).send({
        errors: ['Invalid credentials'],
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
    const decoded = decodeToken(accessToken, JWT_SECRET);

    if (!decoded) {
      res.status(401).send({});
    }

    const admin = await prisma.admin.findFirst({
      where: {
        id: decoded.id,
      },
    });

    if (!admin) {
      res.status(404).send({
        errors: ['User not found'],
      });
    }

    res.status(200).send(admin);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export async function register(req: Request, res: Response) {
  const { names, username, password } = req.body;

  try {
    const generatedSalt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, generatedSalt);

    const admin = await prisma.admin.create({
      data: {
        firstName: names.firstName,
        lastName: names.lastName,
        username: username,
        password: hash,
        email: '',
      },
    });

    if (!admin) {
      res.status(400).send({});
    }

    res.status(201).send({});
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}
