import { Request, Response } from 'express';
import { countries, documentTypes, documentTypesWithBack } from './data';

export const getNationalities = async (_req: Request, res: Response) => {
  try {
    res.status(200).json(countries);
  } catch (err) {
    res.status(500).json({
      errors: [err.message],
    });
  }
};

export const getDocumentTypes = async (_req: Request, res: Response) => {
  try {
    res.status(200).json({ documentTypes, documentTypesWithBack });
  } catch (err) {
    res.status(500).json({
      errors: [err.message],
    });
  }
};
