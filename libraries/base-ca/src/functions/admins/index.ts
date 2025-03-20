import { Admin, BatchPayload, prisma } from '../../services/prisma';
import {
  CreateAdmin,
  CreateManyAdmins,
  DeleteAdminParams,
  GetAdminParams,
  GetAdminsPaginationParams,
  GetAdminsParams,
  UpdateAdminParams,
  WhereAdmin,
} from './types';

export const createAdmin = async (
  params: CreateAdmin
): Promise<Admin> => {
  try {
    const admin = await prisma.admin.findFirst({
      where: params as WhereAdmin,
    });

    if (admin) {
      return admin;
    }

    const newAdmin = await prisma.admin.create({
      data: params,
    });

    return newAdmin;
  } catch (error: any) {
    throw Error(error);
  }
};

export const createManyAdmins = async (
  params: CreateManyAdmins
): Promise<BatchPayload> => {
  try {
    const newAdmins = await prisma.admin.createMany({
      data: params,
    });

    return newAdmins;
  } catch (error: any) {
    throw Error(error);
  }
};

export const updateAdmin = async ({
  toUpdate,
  where,
}: UpdateAdminParams): Promise<Admin> => {
  const updated = await prisma.admin.update({
    where,
    data: toUpdate,
  });

  return updated;
};

export const deleteAdmin = async ({
  where,
}: DeleteAdminParams): Promise<Admin> => {
  const deleted = await prisma.admin.delete({
    where,
  });
  return deleted;
};

export const getAdmin = async ({
  where,
  select,
}: GetAdminParams): Promise<Admin | null> => {
  const admin = await prisma.admin.findFirst({
    ...(select && { select }),
    where,
  });

  if (!admin) {
    return null;
  }

  return admin;
};

export const getAdmins = async ({
  limit,
  where,
  select,
}: GetAdminsParams): Promise<Admin[]> => {
  const admins = await prisma.admin.findMany({
    ...(limit && { take: limit }),
    ...(select && { select }),
    where,
  });

  return admins;
};

export const getAdminsPagination = async ({
  limit,
  select,
  where,
  offset,
  cursor,
  orderBy,
}: GetAdminsPaginationParams): Promise<Admin[]> => {
  const admins = await prisma.admin.findMany({
    take: limit,
    ...(offset && { skip: offset }),
    ...(select && { select }),
    ...(cursor && { cursor }),
    ...(orderBy && { orderBy }),
    where,
  });

  return admins;
};

export const countAdmins = async () => {
  const count = await prisma.admin.count();
  return count;
};
