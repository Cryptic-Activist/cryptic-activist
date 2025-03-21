import { NextFunction, Request, Response } from 'express';

import { AuthenticationUser } from './zod';
import { JWT_SECRET } from '@/constants/env';
import { decodeToken } from 'cryptic-utils';
import { getUser } from 'base-ca';

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validated = AuthenticationUser.safeParse(req.headers);

    if (validated.error) {
      res.status(401).send({
        errors: validated.error,
      });
      return;
    }

    const token = validated.data.authorization.split('Bearer ')[1];
    const decoded = decodeToken(token, JWT_SECRET);

    if (!decoded) {
      res.status(401).send({
        errors: decoded,
      });
      return;
    }

    const user = await getUser({
      where: { id: decoded.userId },
      select: { id: true },
    });

    if (!user) {
      res.status(401).send({
        errors: ['Invalid token or user was not found.'],
      });
      return;
    }

    next();
  } catch (errors) {
    res.status(500).send({
      errors,
    });
    return;
  }
};
