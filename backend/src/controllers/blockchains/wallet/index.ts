import { Request, Response } from 'express';

import { createWallet } from 'base-ca';

export const connectWallet = async (req: Request, res: Response) => {
  try {
    const { userId, address, type } = req.body;

    console.log(req.body);

    const newWallet = await createWallet({
      where: { address },
      update: {},
      create: {
        userId,
        address,
        type,
      },
    });

    res.status(200).json(newWallet);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
