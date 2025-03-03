import { Request, Response } from 'express';

export const test = async (req: Request, res: Response) => {
  try {
    return res.status(200).send({});
  } catch (err) {
    return res.status(500).send({
      errors: [err.message],
    });
  }
};

export const newSession = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    // @ts-ignore
    req.session.isAuth = true;

    return res.status(200).send({});
  } catch (err) {
    return res.status(500).send({
      errors: [err.message],
    });
  }
};
