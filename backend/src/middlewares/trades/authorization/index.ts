import { fetchGet } from 'cryptic-utils';
import { NextFunction, Request, Response } from 'express';

export async function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response> {
  try {
    const { headers } = req;
    const { authorization } = headers;

    const auth = await fetchGet(
      `${process.env.USER_API}/users/authorization/authorize`,
      { Authorization: authorization },
    );

    if (auth.status !== 200) {
      return res.status(401).send({
        status_code: 401,
      });
    }

    next();
  } catch (err) {
    return res.status(401).send({
      status_code: 401,
      errors: [err.message],
    });
  }
}
