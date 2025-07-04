import { Request, Response } from 'express';
import {
  getPremiumContract,
  getProvider,
} from '@/services/blockchains/premium';

export const subscribe = async (req: Request, res: Response) => {
  const { period, userId } = req.body;

  const contract = getPremiumContract();

  console.log({ contract });

  res.status(200).json({ ok: true });
};
