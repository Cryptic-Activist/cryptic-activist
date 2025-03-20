import { Prisma } from '@/services/prisma';

export type CreateChat = Prisma.ChatCreateInput;

export type CreateManyChats = Prisma.ChatCreateManyInput;

export type WhereChat = Prisma.ChatWhereUniqueInput;

export type UpdateChatParams = {
  toUpdate: Prisma.ChatUpdateInput;
  where: Prisma.ChatWhereUniqueInput;
};

export type DeleteChatParams = {
  where: Prisma.ChatWhereUniqueInput;
};

export type GetChatParams = {
  where?: Prisma.ChatWhereInput;
  select?: Prisma.ChatSelect;
};

export type GetChatsParams = {
  where?: Prisma.ChatWhereInput;
  limit?: number;
  select?: Prisma.ChatSelect;
};

export type GetChatsPaginationParams = {
  limit: number;
  offset?: number;
  cursor?: Prisma.ChatWhereUniqueInput & {
    id: string;
  };
  where?: Prisma.ChatWhereInput;
  select?: Prisma.ChatSelect;
  orderBy?: Prisma.ChatOrderByWithAggregationInput;
};
