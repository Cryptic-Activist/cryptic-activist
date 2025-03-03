import { NextFunction, Request, Response } from 'express';

import {
  CreateCryptocurrencyCoinGecko,
  GetCryptocurrency,
  GetPrice,
} from './zod';

export const validateGetPrice = (
  req: Request,
  res: Response,
  next: NextFunction,
): NextFunction | Response => {
  const { query } = req;

  const validated = GetPrice.safeParse(query);

  if (!validated.success) {
    return res.status(400).send({
      errors: validated.error,
    });
  }

  next();
};

export const validateCreateCryptocurrencyCoinGecko = (
  req: Request,
  res: Response,
  next: NextFunction,
): NextFunction | Response => {
  const { body } = req;

  const validated = CreateCryptocurrencyCoinGecko.safeParse(body);

  if (!validated.success) {
    return res.status(400).send({
      errors: validated.error,
    });
  }

  next();
};

export const validateGetCryptocurrency = (
  req: Request,
  res: Response,
  next: NextFunction,
): NextFunction | Response => {
  const { query } = req;

  const validated = GetCryptocurrency.safeParse(query);

  if (!validated.success) {
    return res.status(400).send({
      errors: validated.error,
    });
  }

  next();
};
