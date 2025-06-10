import { NextFunction, Request, Response } from 'express';

import { UploadFilesBody } from './zod';

export const validateUploadFiles = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;

  console.log({ req });

  const validated = UploadFilesBody.safeParse(body);

  if (!validated.success) {
    res.status(400).send({
      errors: validated.error,
    });
    return;
  }

  next();
};
