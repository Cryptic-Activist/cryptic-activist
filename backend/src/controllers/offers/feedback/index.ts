import { Request, Response } from 'express';

import { prisma } from '@/services/db/prisma';
import { sanitize } from '@/utils/sanitizer';

export const createFeedback = async (req: Request, res: Response) => {
  const { vendor_id, user_id, offer_id, message, type } = req.body;

  const cleanReqBody = sanitize(
    {
      vendor_id,
      user_id,
      offer_id,
      message,
      type,
    },
    [],
  );

  try {
    const feedback = await prisma.feedback.create({
      data: {
        vendor: {
          connect: cleanReqBody.vendor_id,
        },
        trader: { connect: cleanReqBody.user_id },
        offer: { connect: cleanReqBody.offer_id },
        message: cleanReqBody.message,
        type: cleanReqBody.type,
      },
    });

    res.status(201).send(feedback);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
};
