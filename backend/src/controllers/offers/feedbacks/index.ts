import { countFeedbacks, getFeedbacks, getFeedbacksPagination } from 'base-ca';
import { sanitize } from 'cryptic-utils';
import { Request, Response } from 'express';

export async function countFeedbacksController(
  req: Request,
  res: Response,
): Promise<Response> {
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

    return res.status(200).send({
      status_code: 200,
      results: counts,
      errors: [],
    });
  } catch (err) {
    return res.status(500).send({
      status_code: 500,
      results: {},
      errors: [err.message],
    });
  }
}

export async function indexFeedbacks(
  req: Request,
  res: Response,
): Promise<Response> {
  try {
    // @ts-ignore
    const feedbacks = await getFeedbacks(null, []);

    return res.status(200).send({
      status_code: 200,
      results: feedbacks,
      errors: [],
    });
  } catch (err) {
    return res.status(500).send({
      status_code: 500,
      results: {},
      errors: [err.message],
    });
  }
}

export async function indexFeedbacksPagination(
  req: Request,
  res: Response,
): Promise<Response> {
  console.log(req.query);
  try {
    const { limit, skip } = req.query;
    const { vendor_id, user_id, offer_id, message, type } = req.body;

    const cleanReqQuery = sanitize(
      {
        limit: limit.toString(),
        skip: skip.toString(),
      },
      [],
    );
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

    const feedbacks = await getFeedbacksPagination(
      cleanReqQuery.limit,
      cleanReqQuery.skip,
      ['user', 'offer'],
      // @ts-ignore
      cleanReqBody,
    );

    return res.status(200).send({
      status_code: 200,
      results: feedbacks,
      errors: [],
    });
  } catch (err) {
    return res.status(500).send({
      status_code: 500,
      results: {},
      errors: [err.message],
    });
  }
}

export const getFeedbacksByUser = async (req: Request, res: Response) => {
  try {
    const { params } = req;
    const { userId } = params;

    const feedbacks = await getFeedbacks({ vendorId: userId });

    return res.status(200).send({
      status_code: 200,
      results: feedbacks,
      errors: [],
    });
  } catch (error) {
    return res.status(500).send({
      status_code: 500,
      results: {},
      errors: [error.message],
    });
  }
};
