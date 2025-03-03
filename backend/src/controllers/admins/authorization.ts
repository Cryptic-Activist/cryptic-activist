import { getAdmin } from 'base-ca';
import { decodeToken } from 'cryptic-utils';
import { Request, Response } from 'express';

import { JWT_SECRET } from '../../constants/env';

export const authorize = async (req: Request, res: Response) => {
  try {
    const { headers } = req;
    const { authorization } = headers;

    if (!authorization) {
      return res.status(401).send({
        errors: ['Authorization token is required'],
      });
    }

    const authorizationArr = authorization.split(' ');

    console.log({ authorizationArr });

    if (authorizationArr.length !== 2 && authorizationArr[0]) {
      return res.status(401).send({
        errors: ['Authorization token is invalid'],
      });
    }

    const decoded = decodeToken(authorizationArr[1], JWT_SECRET);

    const admin = await getAdmin({ id: decoded.id });

    if (!admin) {
      return res.status(401).send({
        errors: ['Invalid admin.'],
      });
    }

    return res.status(200).send({});
  } catch (err) {
    return res.status(401).send({
      errors: [err],
    });
  }
};
