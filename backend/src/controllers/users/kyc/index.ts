import { Request, Response } from 'express';
import { countries, documentTypes } from './data';

export const getNationalities = async (_req: Request, res: Response) => {
  try {
    res.status(200).send(countries);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
};

export const getDocumentTypes = async (_req: Request, res: Response) => {
  try {
    res.status(200).send(documentTypes);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
};
