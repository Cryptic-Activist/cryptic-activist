import { EMAIL_FROM, sendEmail } from '@/services/email';
import { Request, Response } from 'express';
import { associateLanguage, diassociateLanguage } from '@/services/language';
import {
  buildChangeEmailRequestEmail,
  buildChangeEmailSuccessEmail,
} from '@/services/email/templates';
import { decodeToken, generateToken } from '@/utils/generators/jwt';

import availableLanguages from './data';
import { prisma } from '@/services/db';

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

export async function requestEmailChange(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      res.status(404).send({
        error: 'User not found',
      });
      return;
    }

    const emailChangeToken = generateToken({
      objectToTokenize: {
        newEmail: email,
        userId: user.id,
      },
      expiresIn: '5m',
    });

    const emailChangeRequestEmail = await sendEmail({
      from: EMAIL_FROM.ACCOUNT,
      to: [
        {
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
        },
      ],
      subject: 'Email Change Request - Cryptic Activist',
      html: buildChangeEmailRequestEmail(user, email, emailChangeToken),
    });

    console.log({ emailChangeRequestEmail });

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

export async function emailChange(req: Request, res: Response) {
  try {
    const { token } = req.params;

    const decoded = decodeToken(token);

    console.log({ decoded });

    if (!decoded) {
      res.status(400).send({
        error: 'Invalid token',
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
    });

    if (!user) {
      res.status(404).send({
        error: 'User not found',
      });
      return;
    }

    const updated = await prisma.user.update({
      where: {
        id: decoded.userId,
      },
      data: {
        email: decoded.newEmail,
      },
    });

    const emailChangeEmail = await sendEmail({
      from: EMAIL_FROM.ACCOUNT,
      to: [
        {
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
        },
      ],
      subject: 'Email Change - Cryptic Activist',
      html: buildChangeEmailSuccessEmail(user),
    });

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
