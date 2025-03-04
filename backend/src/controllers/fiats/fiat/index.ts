import { Request, Response } from 'express';

import { getFiat } from 'base-ca';

export const getFiatController = async (req: Request, res: Response) => {
  try {
    const { query } = req;
    const { fiatSymbol } = query;
    // @ts-ignore
    const fiat = await getFiat({ symbol: fiatSymbol });

    res.status(200).send({
      status_code: 200,
      results: {
        id: fiat?.id,
        symbol: fiat?.symbol,
        name: fiat?.name,
      },
    });
  } catch (err) {
    res.status(500).send({
      status_code: 500,
      errors: [err.message],
    });
  }
};
