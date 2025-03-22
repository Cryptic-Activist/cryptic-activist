import { Request, Response } from 'express';
// import jwt from 'jsonwebtoken';
import { createAdmin, getAdmin } from 'base-ca';
import {
  decodeToken,
  generateRefreshToken,
  generateToken,
  generateUniqueUsername,
  sanitize,
} from 'cryptic-utils';

import { JWT_SECRET } from '@/constants/env';
import bcrypt from 'bcryptjs';

// import { validateAdminUsername } from '@/utils/validators';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const errors: string[] = [];

    const admin = await getAdmin({ where: { username } });

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

    const admin = await getAdmin({ where: { id: decoded.id } });

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
    const errors: string[] = [];

    const cleanBody = sanitize({ ...names, username }, []);

    // const usernameValidation = await validateAdminUsername(cleanBody.username);

    // if (!usernameValidation.valid) {
    //   cleanBody.username = generateUniqueUsername(cleanBody.username);
    // }

    if (errors.length > 0) {
      res.status(400).send({
        errors,
      });
    }

    const generatedSalt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(password, generatedSalt);

    const admin = await createAdmin({
      where: {
        id: '',
      },
      update: {},
      create: {
        firstName: cleanBody.firstName,
        lastName: cleanBody.lastName,
        username: cleanBody.username,
        password: hash,
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
