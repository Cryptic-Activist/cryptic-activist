import { Prisma } from '@/services/prisma';

export type CreateAdmin = Prisma.AdminCreateInput;

export type CreateManyAdmins = Prisma.AdminCreateManyInput;

export type WhereAdmin = Prisma.AdminWhereUniqueInput;

export type UpdateAdminParams = {
  toUpdate: Prisma.AdminUpdateInput;
  where: Prisma.AdminWhereUniqueInput;
};

export type DeleteAdminParams = {
  where: Prisma.AdminWhereUniqueInput;
};

export type GetAdminParams = {
  where?: Prisma.AdminWhereInput;
  select?: Prisma.AdminSelect;
};

export type GetAdminsParams = {
  where?: Prisma.AdminWhereInput;
  limit?: number;
  select?: Prisma.AdminSelect;
};

export type GetAdminsPaginationParams = {
  limit: number;
  offset?: number;
  cursor?: Prisma.AdminWhereUniqueInput & {
    id: string;
  };
  where?: Prisma.AdminWhereInput;
  select?: Prisma.AdminSelect;
  orderBy?: Prisma.AdminOrderByWithAggregationInput;
};
