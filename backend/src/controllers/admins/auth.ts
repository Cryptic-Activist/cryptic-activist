// import jwt from 'jsonwebtoken';
import { createAdmin, getAdmin } from 'base-ca';
import bcrypt from 'bcryptjs';
import {
  decodeToken,
  generateRefreshToken,
  generateToken,
  generateUniqueUsername,
  sanitize,
} from 'cryptic-utils';
import { Request, Response } from 'express';

import { JWT_SECRET } from '../../constants/env';
import { assignSafeAdminData } from '../../utils/responses/users';
import { validateAdminUsername } from '../../utils/validators';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const errors: string[] = [];

    const admin = await getAdmin({ username });

    if (!admin) {
      errors.push('User not found');
    }

    if (errors.length > 0) {
      return res.status(400).send({
        errors,
      });
    }

    bcrypt.compare(password, admin!.password, (compareError, isMatch) => {
      if (compareError) {
        return res.status(500).send({
          errors: [compareError.message],
        });
      }

      if (isMatch) {
        if (!admin!.isVerified) {
          return res.status(401).send({
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
      return res.status(401).send({});
    }

    const admin = await getAdmin({ id: decoded.id });

    if (!admin) {
      return res.status(404).send({
        errors: ['User not found'],
      });
    }

    const safeAdmin = await assignSafeAdminData(admin);

    return res.status(200).send({ ...safeAdmin });
  } catch (err) {
    console.log(err);
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

    const usernameValidation = await validateAdminUsername(cleanBody.username);

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

    const admin = await createAdmin({
      firstName: cleanBody.firstName,
      lastName: cleanBody.lastName,
      username: cleanBody.username,
      password: hash,
    });

    if (!admin) {
      return res.status(400).send({});
    }

    return res.status(201).send({});
  } catch (err) {
    return res.status(500).send({
      errors: [err.message],
    });
  }
}
