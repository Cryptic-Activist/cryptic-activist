import { Request, Response } from 'express';

import { createFeedback } from 'base-ca';
import { sanitize } from 'cryptic-utils';

export async function createFeedbackController(req: Request, res: Response) {
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
    // @ts-ignore
    const feedback = await createFeedback({
      vendorId: cleanReqBody.vendor_id,
      userId: cleanReqBody.user_id,
      offerId: cleanReqBody.offer_id,
      message: cleanReqBody.message,
      type: cleanReqBody.type,
    });

    res.status(201).send({
      status_code: 201,
      results: feedback,
      errors: [],
    });
  } catch (err) {
    res.status(500).send({
      status_code: 500,
      results: {},
      errors: [err.message],
    });
  }
}
