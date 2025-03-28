import { Prisma } from '@/services/prisma';

export type CreateUser = Prisma.UserUpsertArgs;

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
  include?: Prisma.UserInclude;
};

export type GetUsersParams = {
  where?: Prisma.UserWhereInput;
  limit?: number;
  select?: Prisma.UserSelect;
  include?: Prisma.UserInclude;
  orderBy?: Prisma.UserOrderByWithAggregationInput;
};

export type GetUsersPaginationParams = {
  limit: number;
  offset?: number;
  cursor?: Prisma.UserWhereUniqueInput & {
    id: string;
  };
  where?: Prisma.UserWhereInput;
  select?: Prisma.UserSelect;
  include?: Prisma.UserInclude;
  orderBy?: Prisma.UserOrderByWithAggregationInput;
};
