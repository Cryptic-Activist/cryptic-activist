import { getOffers, getOffersPagination } from 'base-ca';
import { converterToType, convertWhere, sanitize } from 'cryptic-utils';
import { Request, Response } from 'express';

export async function index(req: Request, res: Response): Promise<Response> {
  try {
    const {
      id,
      vendor_id,
      cryptocurrency_id,
      payment_method_id,
      fiat_id,
      payment_method_type,
      trade_pricing_type,
      trade_pricing_list_at,
      trade_pricing_trade_limits_min,
      trade_pricing_trade_limits_max,
      trade_pricing_time_limit,
      trade_instructions_tags,
      trade_instructions_label,
      trade_instructions_terms,
      trade_instructions_instructions,
      is_deleted,
      when_deleted,
      created_at,
      updated_at,
      associations,
      limit,
    } = req.query;

    // @ts-ignore
    const offers = await getOffers(limit, associations, {
      id,
      vendor_id,
      cryptocurrency_id,
      payment_method_id,
      fiat_id,
      payment_method_type,
      trade_pricing_type,
      trade_pricing_list_at,
      trade_pricing_trade_limits_min,
      trade_pricing_trade_limits_max,
      trade_pricing_time_limit,
      trade_instructions_tags,
      trade_instructions_label,
      trade_instructions_terms,
      trade_instructions_instructions,
      is_deleted,
      when_deleted,
      created_at,
      updated_at,
    });

    return res.status(200).send({
      status_code: 200,
      results: offers,
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

export const indexPagination = async (req: Request, res: Response) => {
  try {
    const { query } = req;

    const converted = converterToType({
      valuesToConvert: { ...query },
      convertTo: {
        limit: 'number',
        skip: 'number',
        paymentMethodType: 'string',
        paymentMethodId: 'string',
        fiatId: 'string',
        cryptocurrencyId: 'string',
      },
    });

    const {
      limit,
      skip,
      paymentMethodType,
      fiatId,
      cryptocurrencyId,
      paymentMethodId,
    } = converted;

    const offers = await getOffersPagination(
      {
        cryptocurrency: true,
        fiat: true,
        paymentMethod: true,
        vendor: true,
        feedbacks: true,
        trades: true,
      },
      limit,
      skip,
      { paymentMethodType, fiatId, cryptocurrencyId, paymentMethodId },
    );

    if (!offers) {
      return res.status(204).send({
        status_code: 204,
      });
    }

    return res.status(200).send({
      status_code: 200,
      results: offers,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      status_code: 500,
      errors: err,
    });
  }
};

export const getOffersController = async (req: Request, res: Response) => {
  console.log(req.query);
  const { trade_instructions_tags, associations } = req.query;

  try {
    const cleanReqQuery = sanitize(
      {
        ...req.query,
      },
      [],
    );

    if (trade_instructions_tags) {
      // @ts-ignore
      const tags = sanitize(trade_instructions_tags.split(','), []);
      cleanReqQuery.trade_instructions_tags = tags;
    }

    if (associations) {
      // @ts-ignore
      const associationsArr = sanitize(associations.split(','), []);
      cleanReqQuery.associations = associationsArr;
    } else {
      cleanReqQuery.associations = [];
    }

    const where = convertWhere({ ...cleanReqQuery }, ['limit', 'associations']);

    const offers = await getOffers(
      cleanReqQuery.limit,
      cleanReqQuery.associations,
      {
        ...where,
      },
    );

    if (!offers) {
      return res.status(204).send({
        status_code: 204,
        results: offers,
      });
    }

    return res.status(200).send({
      status_code: 200,
      results: offers,
    });
  } catch (err) {
    return res.status(500).send({
      status_code: 500,
      errors: err,
    });
  }
};

export const getOffersByUser = async (req: Request, res: Response) => {
  const { query, params } = req;
  const { vendorId } = params;
  const { type } = query;

  try {
    const offers = await getOffers(
      {
        cryptocurrency: true,
        fiat: true,
        paymentMethod: true,
        vendor: true,
      },
      { vendorId, paymentMethodType: type as string },
    );

    console.log(offers);

    return res.status(200).send({
      status_code: 200,
      results: offers,
    });
  } catch (error) {
    return res.status(500).send({
      status_code: 500,
      errors: [error.message],
    });
  }
};
