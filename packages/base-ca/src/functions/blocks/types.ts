import { Prisma } from '@/services/prisma';

export type CreateBlock = Prisma.BlockUpsertArgs;

export type CreateManyBlocks = Prisma.BlockCreateManyInput;

export type WhereBlock = Prisma.BlockWhereUniqueInput;

export type UpdateBlockParams = {
  toUpdate: Prisma.BlockUpdateInput;
  where: Prisma.BlockWhereUniqueInput;
};

export type DeleteBlockParams = {
  where: Prisma.BlockWhereUniqueInput;
};

export type GetBlockParams = {
  where?: Prisma.BlockWhereInput;
  select?: Prisma.BlockSelect;
};

export type GetBlocksParams = {
  where?: Prisma.BlockWhereInput;
  limit?: number;
  select?: Prisma.BlockSelect;
  orderBy?: Prisma.BlockOrderByWithAggregationInput;
};

export type GetBlocksPaginationParams = {
  limit: number;
  offset?: number;
  cursor?: Prisma.BlockWhereUniqueInput & {
    id: string;
  };
  where?: Prisma.BlockWhereInput;
  select?: Prisma.BlockSelect;
  orderBy?: Prisma.BlockOrderByWithAggregationInput;
};
