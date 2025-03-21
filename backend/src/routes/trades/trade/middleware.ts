import { CalculateReceivingAmount, CreateTrade, GetTrade } from './zod';
import { NextFunction, Request, Response } from 'express';

export function validateCreateTrade(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { body } = req;
  const validated = CreateTrade.safeParse(body);

  if (validated.success) {
    next();
  } else {
    res.status(400).send({
      errors: validated.error,
    });
  }
}

export function validateGetTrade(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { params } = req;
  const validated = GetTrade.safeParse(params);

  if (validated.success) {
    next();
  } else {
    res.status(400).send({
      // @ts-ignore
      errors: validated.errors,
    });
  }
}

export function validateCancelTrade(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.body;

  const errors: string[] = [];

  if (!id) {
    errors.push('id is required.');
  } else if (id.length === 0) {
    errors.push('id must be valid.');
  }

  try {
    BigInt(id);
  } catch (err) {
    errors.push('id must be a number.');
  }

  if (errors.length > 0) {
    res.status(400).send({
      status_code: 400,
      results: {},
      errors,
    });
  }

  next();
}

export function validateSetPaidTrade(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.body;

  const errors: string[] = [];

  if (!id) {
    errors.push('id is required.');
  } else if (id.length === 0) {
    errors.push('id must be valid.');
  }

  try {
    BigInt(id);
  } catch (err) {
    errors.push('id must be a number.');
  }

  if (errors.length > 0) {
    res.status(400).send({
      status_code: 400,
      results: {},
      errors,
    });
  }

  next();
}

export function validateCalculateReceivingAmount(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { query } = req;
  const validated = CalculateReceivingAmount.safeParse(query);

  if (validated.success) {
    next();
  } else {
    res.status(400).send({
      errors: validated.error,
    });
  }
}
