import { Prisma } from '@/services/prisma';

export type CreateUser = Prisma.UserCreateInput;

export type CreateManyUsers = Prisma.UserCreateManyInput;

export type UserWhereInput = Prisma.UserWhereInput;

export type UpdateUserParams = {
  toUpdate: Prisma.UserUpdateInput;
  where: Prisma.UserWhereUniqueInput;
};

export type DeleteUserParams = {
  where: Prisma.UserWhereUniqueInput;
};

export type GetUserParams = {
  where?: Prisma.UserWhereInput;
  select?: Prisma.UserSelect;
};

export type GetUsersParams = {
  where?: Prisma.UserWhereInput;
  limit?: number;
  select?: Prisma.UserSelect;
};

export type GetUsersPaginationParams = {
  limit: number;
  offset?: number;
  cursor?: Prisma.UserWhereUniqueInput & {
    id: string;
  };
  where?: Prisma.UserWhereInput;
  select?: Prisma.UserSelect;
  orderBy?: Prisma.UserOrderByWithAggregationInput;
};
