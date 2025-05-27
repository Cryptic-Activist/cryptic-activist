import { Request, Response } from 'express';

import { prisma } from '@/services/db/prisma';

export async function createPaymentDetails(req: Request, res: Response) {
  try {
    const { body } = req;

    const paymentDetails = await prisma.paymentDetails.create({
      data: {
        ...body,
      },
    });

    res.status(200).send(paymentDetails);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export async function getPaymentDetailsByUserController(
  req: Request,
  res: Response,
) {
  try {
    const { userId } = req.params;

    const paymentDetails = await prisma.paymentDetails.findMany({
      where: { userId },
    });

    res.status(200).send(paymentDetails);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}
