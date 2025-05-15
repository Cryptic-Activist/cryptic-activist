import { NextFunction, Request, Response } from 'express';
import {
  RequestEmailChangeBody,
  RequestEmailChangeParams,
  RequestEmailChangeVerifyParams,
} from './zod';

export const validateRequestEmailChange = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { params, body } = req;

  const validatedParam = RequestEmailChangeParams.safeParse(params);
  const validatedBody = RequestEmailChangeBody.safeParse(body);

  if (!validatedParam.success || !validatedBody.success) {
    res.status(400).send({
      errors: [validatedBody.error, validatedParam.error],
    });
  }

  next();
};

export const validateEmailChange = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { params } = req;

  const validatedParam = RequestEmailChangeVerifyParams.safeParse(params);

  if (!validatedParam.success) {
    res.status(400).send({
      errors: validatedParam.error,
    });
  }

  next();
};
