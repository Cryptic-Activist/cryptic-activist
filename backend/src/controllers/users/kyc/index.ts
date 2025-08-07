import { Request, Response } from 'express';
import { countries, documentTypes, documentTypesWithBack } from './data';
import { getMonthBoundaries, toUTCDateOnly } from '@/utils/date';

import { KYCFile } from './type';
import { KYCStatus } from '@prisma/client';
import { calculatePercentageChange } from '@/utils/number';
import { getPresignedUrl } from '@/services/upload';
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
          dateOfBirth: toUTCDateOnly(birthDate),
          documentType,
          documentNumber,
          additionalNotes,
          userId,
        },
      });
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errors: [err.message],
    });
  }
};

export const getKYCsAdmin = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    const { username, status } = req.query;

    // Construct Prisma `where` clause
    const where: any = {};

    // Status filter
    if (status) {
      where.status = status;
    }

    // Severity filter
    if (username) {
      where.user.username = username;
    }

    const [kycs, totalCount] = await Promise.all([
      prisma.kYC.findMany({
        where,
        select: {
          id: true,
          fullName: true,
          submittedAt: true,
          status: true,
          user: {
            select: {
              username: true,
            },
          },
        },
      }),
      prisma.kYC.count({
        where,
      }),
    ]);

    res.status(200).json({
      data: kycs,
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({
      errors: [err.message],
    });
  }
};

export async function getTotalPendingKYC(_req: Request, res: Response) {
  try {
    const totalPendingKYC = await prisma.kYC.count({
      where: {
        status: 'PENDING',
      },
    });

    const { startOfLastMonth, startOfThisMonth } = getMonthBoundaries();

    // Get counts
    const [thisMonthCount, lastMonthCount] = await Promise.all([
      prisma.kYC.count({
        where: {
          status: 'PENDING',
          createdAt: {
            gte: startOfThisMonth,
          },
        },
      }),
      prisma.kYC.count({
        where: {
          status: 'PENDING',
          createdAt: {
            gte: startOfLastMonth,
            lt: startOfThisMonth,
          },
        },
      }),
    ]);

    const percentageChange = calculatePercentageChange(
      thisMonthCount,
      lastMonthCount,
    );

    res.status(200).json({ total: totalPendingKYC, percentageChange });
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export async function getTotalApprovedKYC(_req: Request, res: Response) {
  try {
    const totalApprovedKYC = await prisma.kYC.count({
      where: {
        status: 'VERIFIED',
      },
    });

    const { startOfLastMonth, startOfThisMonth } = getMonthBoundaries();

    // Get counts
    const [thisMonthCount, lastMonthCount] = await Promise.all([
      prisma.kYC.count({
        where: {
          status: 'VERIFIED',
          createdAt: {
            gte: startOfThisMonth,
          },
        },
      }),
      prisma.kYC.count({
        where: {
          status: 'VERIFIED',
          createdAt: {
            gte: startOfLastMonth,
            lt: startOfThisMonth,
          },
        },
      }),
    ]);

    const percentageChange = calculatePercentageChange(
      thisMonthCount,
      lastMonthCount,
    );

    res.status(200).json({ total: totalApprovedKYC, percentageChange });
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export async function getTotalRejectedKYC(_req: Request, res: Response) {
  try {
    const totalRejectedKYC = await prisma.kYC.count({
      where: {
        status: 'REJECTED',
      },
    });

    const { startOfLastMonth, startOfThisMonth } = getMonthBoundaries();

    // Get counts
    const [thisMonthCount, lastMonthCount] = await Promise.all([
      prisma.kYC.count({
        where: {
          status: 'REJECTED',
          createdAt: {
            gte: startOfThisMonth,
          },
        },
      }),
      prisma.kYC.count({
        where: {
          status: 'REJECTED',
          createdAt: {
            gte: startOfLastMonth,
            lt: startOfThisMonth,
          },
        },
      }),
    ]);

    const percentageChange = calculatePercentageChange(
      thisMonthCount,
      lastMonthCount,
    );

    res.status(200).json({ total: totalRejectedKYC, percentageChange });
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export async function getTotalKYCApplications(_req: Request, res: Response) {
  try {
    const totalRejectedKYC = await prisma.kYC.count();

    const { startOfLastMonth, startOfThisMonth } = getMonthBoundaries();

    // Get counts
    const [thisMonthCount, lastMonthCount] = await Promise.all([
      prisma.kYC.count({
        where: {
          createdAt: {
            gte: startOfThisMonth,
          },
        },
      }),
      prisma.kYC.count({
        where: {
          createdAt: {
            gte: startOfLastMonth,
            lt: startOfThisMonth,
          },
        },
      }),
    ]);

    const percentageChange = calculatePercentageChange(
      thisMonthCount,
      lastMonthCount,
    );

    res.status(200).json({ total: totalRejectedKYC, percentageChange });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export const getKYCsAdminFilters = async (req: Request, res: Response) => {
  try {
    const { filter } = req.params;

    const filters = {
      status: KYCStatus,
    };

    res.status(200).json(Object.values(filters[filter]));
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
};

export const getKYCDetailsAdmin = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const kyc = await prisma.kYC.findUnique({
      where: {
        id,
      },
      select: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        documentFront: true,
        documentBack: true,
        selfie: true,
        utilityBill: true,
        bankStatement: true,
        reviewedBy: true,
        fullName: true,
        documentType: true,
        documentNumber: true,
        additionalNotes: true,
        createdAt: true,
        dateOfBirth: true,
        id: true,
        rejectionReason: true,
        nationality: true,
        status: true,
        submittedAt: true,
        updatedAt: true,
        reviewedAt: true,
      },
    });

    let documentFront: KYCFile = { key: null };
    let documentBack: KYCFile = { key: null };
    let selfie: KYCFile = { key: null };
    let utilityBill: KYCFile = { key: null };
    let bankStatement: KYCFile = { key: null };

    if (kyc?.documentFront) {
      const presignedDocumentFront = await getPresignedUrl(
        kyc.documentFront.key,
      );
      documentFront = {
        key: presignedDocumentFront.url ?? null,
      };
    }
    if (kyc?.documentBack) {
      const presignedDocumentBack = await getPresignedUrl(kyc.documentBack.key);
      documentBack = {
        key: presignedDocumentBack.url ?? null,
      };
    }
    if (kyc?.selfie) {
      const presignedSelfie = await getPresignedUrl(kyc.selfie.key);
      selfie = {
        key: presignedSelfie.url ?? null,
      };
    }
    if (kyc?.utilityBill) {
      const presignedUtilityBill = await getPresignedUrl(kyc.utilityBill.key);
      utilityBill = { key: presignedUtilityBill.url ?? null };
    }
    if (kyc?.bankStatement) {
      const presignedBankStatement = await getPresignedUrl(
        kyc.bankStatement.key,
      );
      bankStatement = { key: presignedBankStatement.url ?? null };
    }

    res.status(200).json({
      ...kyc,
      ...(documentFront.key && { documentFront }),
      ...(documentBack.key && { documentBack }),
      ...(selfie.key && { selfie }),
      ...(utilityBill.key && { utilityBill }),
      ...(bankStatement.key && { bankStatement }),
    });
  } catch (err) {
    console.log({ err });
    res.status(500).send({
      errors: [err.message],
    });
  }
};

export const approveKYCAdmin = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { adminId } = req.body;

    const admin = await prisma.admin.findUnique({
      where: {
        id: adminId,
      },
      select: {
        id: true,
      },
    });

    if (!admin) {
      res.status(400).json({ error: 'Unable to find Admin' });
      return;
    }

    const kyc = await prisma.kYC.findUnique({
      where: { id },
      select: {
        userId: true,
      },
    });

    if (!kyc) {
      res.status(400).json({ error: 'Unable to find KYC application' });
      return;
    }

    await prisma.kYC.update({
      where: {
        id,
      },
      data: {
        status: 'VERIFIED',
        reviewedAt: new Date(),
        reviewedById: adminId,
      },
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
};

export const rejectKYCAdmin = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { adminId, rejectionReason } = req.body;

    const admin = await prisma.admin.findUnique({
      where: {
        id: adminId,
      },
      select: {
        id: true,
      },
    });

    if (!admin) {
      res.status(400).json({ error: 'Unable to find Admin' });
      return;
    }

    await prisma.kYC.update({
      where: {
        id,
      },
      data: {
        status: 'REJECTED',
        reviewedAt: new Date(),
        reviewedById: adminId,
        rejectionReason,
      },
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
};
