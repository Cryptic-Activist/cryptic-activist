import { Request, Response } from 'express';

export const connectWallet = async (req: Request, res: Response) => {
  try {
    const { userId, address, type } = req.body;

    // const newWallet = await createWallet({
    //   where: { address },
    //   update: {},
    //   create: {
    //     userId,
    //     address,
    //     type,
    //   },
    // });

    res.status(200).json();
  } catch (error) {
    res.status(500).json({ error });
  }
};
