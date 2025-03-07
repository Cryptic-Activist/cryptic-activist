import { Request, Response } from 'express';

import { JWT_SECRET } from '@/constants/env';
import { decodeToken } from 'cryptic-utils';
import { getAdmin } from 'base-ca';

export const authorize = async (req: Request, res: Response) => {
  try {
    const { headers } = req;
    const { authorization } = headers;

    if (!authorization) {
      res.status(401).send({
        errors: ['Authorization token is required'],
      });
    }

    const authorizationArr = authorization?.split(' ');

    if (authorizationArr!.length !== 2 && authorizationArr![0]) {
      res.status(401).send({
        errors: ['Authorization token is invalid'],
      });
    }

    const decoded = decodeToken(authorizationArr![1], JWT_SECRET);

    const admin = await getAdmin({ id: decoded.id });

    if (!admin) {
      res.status(401).send({
        errors: ['Invalid admin.'],
      });
    }

    res.status(200).send({});
  } catch (err) {
    res.status(401).send({
      errors: [err],
    });
  }
};
