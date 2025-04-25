import { Request, Response } from 'express';
import { associateLanguage, diassociateLanguage } from '@/services/language';

import availableLanguages from './data';

export async function addSpokenLanguage(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { language } = req.body;

    console.log({ id, language });

    const isLanguageAvailable =
      availableLanguages.filter((lang) => lang.includes(language)).length > 0;

    if (!isLanguageAvailable) {
      res.status(400).send({
        errors: ['Language is not available'],
      });
      return;
    }

    const associatedLanguage = await associateLanguage(id, language);

    console.log({ associatedLanguage });

    if (!associatedLanguage) {
      res.status(400).send(associatedLanguage);
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

    console.log({ id });

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
    console.log({ err });
    res.status(500).send({
      errors: [err.message],
    });
  }
}
