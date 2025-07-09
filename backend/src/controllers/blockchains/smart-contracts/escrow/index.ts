import { Request, Response } from 'express';

import { ethers } from 'ethers';
import { getEscrowContract } from '@/services/blockchains/escrow';

export const deployEscrowSmartContract = async (
  req: Request,
  res: Response,
) => {
  try {
    const contract = await getEscrowContract();

    res.status(200).json({ contract });
  } catch (error) {
    res.status(500).json({ error });
  }
};
