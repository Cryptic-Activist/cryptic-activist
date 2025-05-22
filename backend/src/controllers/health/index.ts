import { Request, Response } from 'express';

export const healthCheck = async (_req: Request, res: Response) => {
  res.sendStatus(200);
};
