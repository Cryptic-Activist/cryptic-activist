import { Request, Response } from 'express';
import { createOffer, getOffer } from 'base-ca';

export async function createOfferController(req: Request, res: Response) {
  try {
    const { body } = req;
    const { cryptocurrency, fiat, ...rest } = body;

    const create = {
      cryptocurrencyId: cryptocurrency.id,
      fiatId: fiat.id,
      ...rest,
    };

    const newOffer = await createOffer(create);

    res.status(200).send({
      status_code: 200,
      results: newOffer,
      errors: [],
    });
  } catch (err: any) {
    res.status(500).send({
      status_code: 500,
      errors: [err.message],
    });
  }
}

export async function getOfferController(req: Request, res: Response) {
  try {
    const { query } = req;
    const { id, associations } = query;

    const associationsArr = associations?.toString().split(',');
    const associationObj: any = {};

    associationsArr?.forEach((association) => {
      associationObj[association] = true;
    });

    const offer = await getOffer({ id: id?.toString() }, associationObj);

    //   const cleanReqQuery = sanitize(
    //     {
    //       ...req.query,
    //     },
    //     [],
    //   );

    //   if (trade_instructions_tags) {
    //     // @ts-ignore
    //     const tags = sanitize(trade_instructions_tags.split(','), []);
    //     cleanReqQuery.trade_instructions_tags = tags;
    //   }

    //   if (associations) {
    //     // @ts-ignore
    //     const associationsArr = sanitize(associations.split(','), []);
    //     cleanReqQuery.associations = associationsArr;
    //   } else {
    //     cleanReqQuery.associations = [];
    //   }

    //   const where = convertWhere({ ...cleanReqQuery }, ['limit', 'associations']);

    //   const offer = await getOffer(
    //     {
    //       ...where,
    //     },
    //     cleanReqQuery.associations,
    //   );

    //   if (!offer) {
    //     res.status(204).send({
    //       status_code: 204,
    //       results: {},
    //       errors: [],
    //     });
    //   }

    //   const safeOffer = safeOfferValuesAssigner(offer);

    res.status(200).send({
      status_code: 200,
      results: offer,
      errors: [],
    });
  } catch (err: any) {
    res.status(500).send({
      status_code: 500,
      results: {},
      errors: [err.message],
    });
  }
}
