import { Request, Response } from 'express';
import {
  getPremiumContract,
  getProvider,
} from '@/services/blockchains/premium';

import { ETHEREUM_PREMIUM_CONTRACT_ADDRESS } from '@/constants/env';
import { getSetting } from '@/utils/settings';
import { prisma } from '@/services/db';

export const subscribe = async (req: Request, res: Response) => {
  try {
    const { period, userId, payerAddress } = req.body;

    const blockchainTransactionHash =
      '0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0';

    let expectedAmount = 10;

    if (period === 'monthly') {
      const monthly = await getSetting('premiumPriceMonthly');
      expectedAmount = monthly;
    } else if (period === 'yearly') {
      const yearly = await getSetting('premiumPriceYearly');
      expectedAmount = yearly;
    }

    const newPremiumSubscription = await prisma.premiumPurchase.create({
      data: {
        blockchainTransactionHash,
        expectedAmount,
        payerAddress,
        status: 'COMPLETED',
        userId: userId,
      },
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    console.log({ err });
    res.status(500).json({
      errors: [err.message],
    });
  }
};
