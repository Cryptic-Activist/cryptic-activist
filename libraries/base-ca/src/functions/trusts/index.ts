import { Trust, prisma } from '../../services/prisma';
import type {
  CreateTrustParamsType,
  DeleteTrustWhereType,
  GetTrustReturnType,
  GetTrustWhereType,
  TrustAssociationsArrayType,
  UpdateTrustToUpdateType,
  UpdateTrustWhereType,
} from './types';

export const createTrust = async (
  params: CreateTrustParamsType
): Promise<Trust | undefined> => {
  try {
    const trust = await prisma.trust.findFirst({ where: params });

    if (trust) {
      return trust;
    }

    const newTrust = await prisma.trust.create({ data: params });

    return newTrust;
  } catch (error: any) {
    throw Error(error);
  }
};

export const updateTrust = async (
  where: UpdateTrustWhereType,
  toUpdate: UpdateTrustToUpdateType
): Promise<Trust> => {
  const updated = await prisma.trust.update({
    data: toUpdate,
    where,
  });
  return updated;
};

export const deleteTrust = async (
  where: DeleteTrustWhereType
): Promise<Trust> => {
  const deleted = await prisma.trust.delete({ where });
  return deleted;
};

export const getTrust = async (
  where: GetTrustWhereType,
  associations: TrustAssociationsArrayType
): Promise<Trust | null> => {
  const trust = await prisma.trust.findFirst({
    where,
    include: associations,
  });

  if (!trust) {
    return null;
  }

  return trust;
};

export const getTrusts = async (
  associations: TrustAssociationsArrayType,
  where?: GetTrustWhereType,
  limit?: number
): Promise<Trust[]> => {
  const trusts = await prisma.trust.findMany({
    take: limit,
    where,
    include: associations,
  });

  return trusts;
};

export const getTrustsPagination = async (
  associations: TrustAssociationsArrayType,
  limit: number,
  offset: number,
  where?: GetTrustWhereType
): Promise<Trust[]> => {
  const users = await prisma.trust.findMany({
    take: limit,
    skip: offset,
    where,
    include: associations,
  });

  return users;
};

export const countTrusts = async (
  where?: GetTrustWhereType
): Promise<number> => {
  const count = await prisma.trust.count({ where });
  return count;
};
