import { Request, Response } from 'express';
import { countries, documentTypes, documentTypesWithBack } from './data';

import { prisma } from '@/services/db';

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

export const submitKYC = async (req: Request, res: Response) => {
  try {
    const {
      files,
      fullName,
      birthDate,
      nationality,
      documentType,
      documentNumber,
      additionalNotes,
      consentProcessing,
      agreeTerms,
      userId,
    } = req.body;

    console.log({ reqBody: req.body });

    const transactions = await prisma.$transaction(async (tx) => {
      const uploadedFiles = await Promise.all(
        files.map(async (file: any) => {
          const newUploadedFile = await tx.uploadedFile.create({
            data: {
              key: file.file.key,
              mimeType: file.file.mimeType,
              size: file.file.size,
            },
          });

          return { file: newUploadedFile, type: file.type };
        }),
      );

      const documentFront = uploadedFiles.find(
        (file) => file.type === 'DOCUMENT_FRONT',
      )?.file;
      const documentBack = uploadedFiles.find(
        (file) => file.type === 'DOCUMENT_BACK',
      )?.file;
      const selfie = uploadedFiles.find((file) => file.type === 'SELFIE')?.file;
      const utilityBill = uploadedFiles.find(
        (file) => file.type === 'UTILITY_BILL',
      )?.file;
      const bankStatement = uploadedFiles.find(
        (file) => file.type === 'BANK_STATEMENT',
      )?.file;

      await tx.kYC.create({
        data: {
          fullName,
          documentBackId: documentBack?.id,
          documentFrontId: documentFront?.id,
          selfieId: selfie?.id,
          utilityBillId: utilityBill?.id,
          bankStatementId: bankStatement?.id,
          nationality,
          dateOfBirth: new Date(birthDate),
          documentType,
          documentNumber,
          additionalNotes,
          userId,
        },
      });
    });

    res.status(200).json({ transactions });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errors: [err.message],
    });
  }
};
