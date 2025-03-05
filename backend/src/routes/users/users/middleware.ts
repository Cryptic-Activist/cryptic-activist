import {
  AssociateLanguageToUser,
  GetMultipleUsers,
  GetUser,
  IndexLanguagesByUser,
  RemoveLangaugeFromUser,
} from './zod';
import { NextFunction, Request, Response } from 'express';

export const validateGetUserRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { query } = req;

  const validated = GetUser.safeParse(query);

  if (!validated.success) {
    res.status(400).send({
      errors: validated.error,
    });
  }

  next();
};

export const validateGetMultipleUserRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { query } = req;

  const validated = GetMultipleUsers.safeParse(query);

  if (!validated.success) {
    res.status(400).send({
      errors: validated.error,
    });
  }

  next();
};

export const validateIndexLanguagesByUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { params } = req;
  const { userId } = params;

  const validated = IndexLanguagesByUser.safeParse(userId);

  if (!validated.success) {
    res.status(400).send({
      errors: validated.error,
    });
  }

  next();
};

export const validateAssociateLanguageToUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { params, body } = req;
  const { userId } = params;
  const { languageName } = body;

  const toValidate = { userId, languageName };

  const validated = AssociateLanguageToUser.safeParse(toValidate);

  if (!validated.success) {
    res.status(400).send({
      errors: validated.error,
    });
  }

  next();
};

export const validateRemoveLanguageToUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { params, body } = req;
  const { userId } = params;
  const { languageName } = body;

  const toValidate = { userId, languageName };

  const validated = RemoveLangaugeFromUser.safeParse(toValidate);

  if (!validated.success) {
    res.status(400).send({
      errors: validated.error,
    });
  }

  next();
};
