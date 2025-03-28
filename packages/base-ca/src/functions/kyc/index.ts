import { BatchPayload, KYC, prisma } from '../../services/prisma';
import {
  CreateKYC,
  CreateManyKYCs,
  DeleteKYCParams,
  GetKYCParams,
  GetKYCsPaginationParams,
  GetKYCsParams,
  UpdateKYCParams,
} from './types';

export const createKYC = async (params: CreateKYC): Promise<KYC> => {
  try {
    const newKYC = await prisma.kYC.upsert(params);

    return newKYC;
  } catch (error: any) {
    throw Error(error);
  }
};

export const createManyKYCs = async (
  params: CreateManyKYCs[]
): Promise<BatchPayload> => {
  try {
    const newKYCs = await prisma.kYC.createMany({
      data: params,
    });

    return newKYCs;
  } catch (error: any) {
    throw Error(error);
  }
};

export const updateKYC = async ({
  toUpdate,
  where,
}: UpdateKYCParams): Promise<KYC> => {
  const updated = await prisma.kYC.update({
    where,
    data: toUpdate,
  });

  return updated;
};

export const deleteKYC = async ({
  where,
}: DeleteKYCParams): Promise<KYC> => {
  const deleted = await prisma.kYC.delete({
    where,
  });
  return deleted;
};

export const getKYC = async ({
  where,
  select,
}: GetKYCParams): Promise<KYC | null> => {
  const kYC = await prisma.kYC.findFirst({
    ...(select && { select }),
    where,
  });

  if (!kYC) {
    return null;
  }

  return kYC;
};

export const getKYCs = async ({
  limit,
  where,
  select,
}: GetKYCsParams): Promise<KYC[]> => {
  const kycs = await prisma.kYC.findMany({
    ...(limit && { take: limit }),
    ...(select && { select }),
    where,
  });

  return kycs;
};

export const getKYCsPagination = async ({
  limit,
  select,
  where,
  offset,
  cursor,
  orderBy,
}: GetKYCsPaginationParams): Promise<KYC[]> => {
  const kycs = await prisma.kYC.findMany({
    take: limit,
    ...(offset && { skip: offset }),
    ...(select && { select }),
    ...(cursor && { cursor }),
    ...(orderBy && { orderBy }),
    where,
  });

  return kycs;
};

export const countKYCs = async () => {
  const count = await prisma.kYC.count();
  return count;
};
