import { Request, Response } from 'express';

export async function ping(_req: Request, res: Response) {
  console.log('Pong');
  return res.status(200).send({ ok: true });
}
