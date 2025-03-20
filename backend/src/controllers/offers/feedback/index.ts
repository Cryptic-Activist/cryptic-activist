import { Request, Response } from 'express';

import { connect } from 'http2';
import { createFeedback as createFeedbackBaseCa } from 'base-ca';
import { sanitize } from 'cryptic-utils';

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
    const feedback = await createFeedbackBaseCa({
      vendor: {
        connect: cleanReqBody.vendor_id,
      },
      trader: { connect: cleanReqBody.user_id },
      offer: { connect: cleanReqBody.offer_id },
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
};
