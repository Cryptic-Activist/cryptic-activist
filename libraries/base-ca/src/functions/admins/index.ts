import { Admin, PrismaClient } from '@prisma/client';

import {
  AdminDynamicType,
  CreateAdminParams,
  GetAdminReturnType,
  WhereAdminParams,
} from './types';

const prisma = new PrismaClient();

export const createAdmin = async (
  params: CreateAdminParams
): Promise<Admin> => {
  const created = await prisma.admin.create({
    data: params,
  });
  return created;
};

export const updateAdmin = async (
  where: WhereAdminParams,
  toUpdate: WhereAdminParams
): Promise<Admin> => {
  const updated = await prisma.admin.update({
    where,
    data: toUpdate,
  });
  return updated;
};

export const deleteAdmin = async (where: Admin): Promise<Admin> => {
  const deleted = await prisma.admin.delete({ where });
  return deleted;
};

export const getAdmin = async (
  where: WhereAdminParams
): Promise<Admin | null> => {
  const admin = await prisma.admin.findFirst({
    where,
  });

  if (!admin) return null;

  return admin;
};

export const getAdmins = async (
  where?: WhereAdminParams,
  limit?: number
): Promise<Admin[]> => {
  const admins = await prisma.admin.findMany({
    take: limit,
    where,
  });

  return admins;
};

export const getAdminsPagination = async (
  limit: number,
  offset: number,
  where?: WhereAdminParams
): Promise<Admin[]> => {
  const admins = await prisma.admin.findMany({
    take: limit,
    skip: offset,
    where,
  });

  return admins;
};
