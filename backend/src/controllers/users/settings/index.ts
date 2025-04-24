import { Request, Response } from 'express';
import { associateLanguage, diassociateLanguage } from '@/services/language';

export async function addSpokenLanguage(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { language } = req.body;

    const associatedLanguage = await associateLanguage(id, language);

    console.log({ associatedLanguage });

    if (!associatedLanguage) {
      res.status(400).send({
        ok: false,
      });
      return;
    }

    res.status(200).send(associatedLanguage);
    return;
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export async function removeSpokenLanguage(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { languageId } = req.body;

    const diassociatedLanguage = await diassociateLanguage(id, languageId);

    if (!diassociatedLanguage) {
      res.status(400).send({
        ok: false,
      });
      return;
    }

    res.status(200).send({
      ok: true,
    });
    return;
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}
