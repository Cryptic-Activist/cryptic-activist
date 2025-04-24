import { Request, Response } from 'express';

import { prisma } from '@/services/db/prisma';
import { sanitize } from '@/utils/sanitizer';

export async function countFeedbacksController(req: Request, res: Response) {
  const { id, vendor_id, user_id, offer_id, message, type } = req.body;

  try {
    const cleanReqBody = sanitize(
      {
        id,
        vendor_id,
        user_id,
        offer_id,
        message,
        type,
      },
      [],
    );

    const counts = await prisma.feedback.count({ where: cleanReqBody });

    res.status(200).send(counts);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export async function indexFeedbacks(_req: Request, res: Response) {
  try {
    const feedbacks = await prisma.feedback.findMany();

    res.status(200).send(feedbacks);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export async function indexFeedbacksPagination(req: Request, res: Response) {
  try {
    const { limit, skip } = req.query;
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

    const feedbacks = await prisma.feedback.findMany({
      skip: cleanReqBody.skip,
      take: cleanReqBody.limit,
      select: {
        offer: true,
        vendor: true,
      },
    });

    res.status(200).send(feedbacks);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export const getFeedbacksByUser = async (req: Request, res: Response) => {
  try {
    const { params } = req;
    const { userId } = params;

    const feedbacks = await prisma.feedback.findMany({
      where: { vendorId: userId },
    });

    res.status(200).send(feedbacks);
  } catch (error) {
    res.status(500).send({
      errors: [error.message],
    });
  }
};
