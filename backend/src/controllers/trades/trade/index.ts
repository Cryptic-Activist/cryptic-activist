import { Request, Response } from 'express';
import { createTrade, getTrade, updateTrade } from 'base-ca';

import { sanitizeInputGetTrade } from '@/utils/sanitizer/trade';

export async function index(req: Request, res: Response) {
  try {
  } catch (err) {
    res.status(500).send({
      status_code: 500,
      results: {},
      errors: [err.message],
    });
  }
}

export async function createTradeController(req: Request, res: Response) {
  try {
    const { body } = req;

    const newTrade = await createTrade({
      where: { id: '' },
      update: {},
      create: { ...body },
    });

    res.status(200).send(newTrade);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export async function cancelTrade(req: Request, res: Response) {
  try {
    const { id } = req.body;

    const cleanReqBody = sanitizeInputGetTrade({ id });

    const trade = await updateTrade({
      where: { id: cleanReqBody.id },
      toUpdate: { status: 'CANCELLED', endedAt: new Date() },
    });

    res.status(200).send(trade);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export async function setPaidTrade(req: Request, res: Response) {
  try {
    const { id } = req.body;

    const cleanReqBody = sanitizeInputGetTrade({ id });

    const trade = await updateTrade({
      where: { id: cleanReqBody.id },
      toUpdate: { status: 'CANCELLED', endedAt: new Date() },
    });

    res.status(200).send(trade);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export async function getTradeController(req: Request, res: Response) {
  try {
    const { params } = req;
    const { id } = params;

    const trade = await getTrade({
      where: { id },
      select: {
        chat: true,
        cryptocurrency: true,
        fiat: true,
        offer: true,
        trader: true,
        vendor: true,
      },
    });

    if (!trade) {
      res.status(204).send();
    }

    // const safeTrade = safeTradeValuesAssigner(trade);

    res.status(200).send(trade);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}
