import { Request, Response } from 'express';
import {
  associateUserToLanguage,
  disassociateUserToLanguage,
  getLanguage,
  getUser,
} from 'base-ca';

export async function indexByUser(req: Request, res: Response) {
  try {
    const { user_id } = req.params;

    const user = await getUser({
      where: { id: user_id },
      select: {
        userLanguage: true,
      },
    });

    res.status(200).send({
      ...user,
    });
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export const associateLanguage = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const { languageName } = req.body;

    const language = await getLanguage({
      where: {
        name: languageName,
      },
    });

    await associateUserToLanguage({
      languageId: language!.id,
      userId: user_id,
    });

    res.status(200).send({
      ...language,
    });
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
};

export async function removeLanguageFromUser(req: Request, res: Response) {
  try {
    const { user_id } = req.params;
    const { languageName } = req.body;

    const language = await getLanguage({
      where: {
        name: languageName,
      },
    });

    await disassociateUserToLanguage({
      languageId: language!.id,
      userId: user_id,
    });

    res.status(200).send({});
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}
