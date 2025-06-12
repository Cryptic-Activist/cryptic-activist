import {
  AddDisputePartyNote,
  AddResolutionDecision,
  GetPreviousDisputePartyNote,
  ResolveInFavor,
} from './zod';
import { NextFunction, Request, Response } from 'express';

export const validateAddDisputePartyNote = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;

  const validated = AddDisputePartyNote.safeParse(body);

  if (!validated.success) {
    res.status(400).send({
      errors: validated.error,
    });
    return;
  }

  next();
};

export const validateGetPreviousPartyNote = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { query } = req;

  const validated = GetPreviousDisputePartyNote.safeParse(query);

  if (!validated.success) {
    res.status(400).send({
      errors: validated.error,
    });
    return;
  }

  next();
};

export const validateAddResolutionDecision = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;

  const validated = AddResolutionDecision.safeParse(body);

  if (!validated.success) {
    res.status(400).send({
      errors: validated.error,
    });
    return;
  }

  next();
};

export const validateResolveInFavor = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;

  const validated = ResolveInFavor.safeParse(body);

  if (!validated.success) {
    res.status(400).send({
      errors: validated.error,
    });
    return;
  }

  next();
};

export const validateCancelTradeByModerator = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;

  const validated = ResolveInFavor.safeParse(body);

  if (!validated.success) {
    res.status(400).send({
      errors: validated.error,
    });
    return;
  }

  next();
};
