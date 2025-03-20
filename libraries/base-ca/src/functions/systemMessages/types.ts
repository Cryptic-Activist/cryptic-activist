import { Prisma } from '@/services/prisma';

export type CreateSystemMessage = Prisma.SystemMessageCreateInput;

export type CreateManySystemMessages =
  Prisma.SystemMessageCreateManyInput;

export type WhereSystemMessage = Prisma.SystemMessageWhereUniqueInput;

export type UpdateSystemMessageParams = {
  toUpdate: Prisma.SystemMessageUpdateInput;
  where: Prisma.SystemMessageWhereUniqueInput;
};

export type DeleteSystemMessageParams = {
  where: Prisma.SystemMessageWhereUniqueInput;
};

export type GetSystemMessageParams = {
  where?: Prisma.SystemMessageWhereInput;
  select?: Prisma.SystemMessageSelect;
};

export type GetSystemMessagesParams = {
  where?: Prisma.SystemMessageWhereInput;
  limit?: number;
  select?: Prisma.SystemMessageSelect;
  orderBy?: Prisma.SystemMessageOrderByWithAggregationInput;
};

export type GetSystemMessagesPaginationParams = {
  limit: number;
  offset?: number;
  cursor?: Prisma.SystemMessageWhereUniqueInput & {
    id: string;
  };
  where?: Prisma.SystemMessageWhereInput;
  select?: Prisma.SystemMessageSelect;
  orderBy?: Prisma.SystemMessageOrderByWithAggregationInput;
};
