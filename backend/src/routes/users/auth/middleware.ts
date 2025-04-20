import {
  AccountVerification,
  Login,
  PassswordReset,
  PasswordReset,
  PrivateKeys,
  Register,
} from './zod';
import { NextFunction, Request, Response } from 'express';

import { getToken } from 'base-ca';

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;

  const validated = Login.safeParse(body);

  if (!validated.success) {
    res.status(400).send({
      errors: validated.error,
    });
  }

  next();
};

export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;

  const validated = Register.safeParse(body);

  if (!validated.success) {
    res.status(400).send({
      errors: validated.error,
    });
  }

  next();
};

export const validatePasswordResetTokenRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { token } = req.query;

  const validated = PasswordReset.safeParse(token);

  if (!validated.success) {
    res.status(400).send({
      errors: validated.error,
    });
  }

  next();
};

export const validatePrivateKeysRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;

  const validated = PrivateKeys.safeParse(body);

  if (!validated.success) {
    res.status(400).send({
      errors: validated.error,
    });
  }

  next();
};

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { token } = req.params;

  const validated = AccountVerification.safeParse({ token });

  if (!validated.success) {
    res.status(400).send({
      errors: validated.error,
    });
    return;
  }

  const verificationToken = await getToken({
    where: {
      token,
      isUsed: false,
    },
  });

  if (!verificationToken) {
    res.status(400).send({
      errors: ['Token not found'],
    });
    return;
  }

  const isInThePast = new Date(verificationToken.expiresAt) < new Date();

  if (isInThePast) {
    res.status(400).send({
      errors: ['Token expired'],
    });
    return;
  }

  if (verificationToken.isUsed) {
    res.status(400).send({
      errors: ['Ts invalid'],
    });
    return;
  }

  next();
};

export const validatePasswordReset = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validated = PassswordReset.safeParse(req.body);

  if (!validated.success) {
    res.status(400).send({
      errors: validated.error,
    });
    return;
  }

  next();
};
