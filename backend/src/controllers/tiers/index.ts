import { Request, Response } from 'express';

import { prisma } from '@/services/db';

export const createTier = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      level,
      tradingFee,
      discount,
      minVolume,
      requiredXP,
    } = req.body;

    const tier = await prisma.tier.upsert({
      where: {
        name,
        description,
        level,
        tradingFee,
        discount,
        minVolume,
        requiredXP,
      },
      update: {},
      create: {
        name,
        description,
        level,
        tradingFee,
        discount,
        minVolume,
        requiredXP,
      },
    });

    res.status(201).send(tier);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
};

export const getTiers = async (_req: Request, res: Response) => {
  try {
    const tiers = await prisma.tier.findMany({
      orderBy: {
        level: 'asc',
      },
    });

    res.status(200).send(tiers);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
};

export const getTier = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const tier = await prisma.tier.findFirst({
      where: { id },
    });

    res.status(200).send(tier);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
};

export const getNextTier = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await prisma.user.findFirst({
      where: { id: userId },
      select: {
        xp: true,
      },
    });

    const tier = await prisma.tier.findFirst({
      where: { requiredXP: { gt: user?.xp } },
    });

    console.log({ user, tier });

    res.status(200).send(tier);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
};
