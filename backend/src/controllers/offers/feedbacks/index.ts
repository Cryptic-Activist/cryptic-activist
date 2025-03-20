import { Request, Response } from 'express';
import { countFeedbacks, getFeedbacks, getFeedbacksPagination } from 'base-ca';

import { sanitize } from 'cryptic-utils';

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

    // @ts-ignore
    const counts = await countFeedbacks(cleanReqBody);

    res.status(200).send(counts);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export async function indexFeedbacks(req: Request, res: Response) {
  try {
    // @ts-ignore
    const feedbacks = await getFeedbacks(null, []);

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

    const feedbacks = await getFeedbacksPagination({
      limit: cleanReqBody.limit,
      offset: cleanReqBody.skip,
      select: { offer: true, vendor: true },
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

    const feedbacks = await getFeedbacks({ where: { vendorId: userId } });

    res.status(200).send(feedbacks);
  } catch (error) {
    res.status(500).send({
      errors: [error.message],
    });
  }
};
