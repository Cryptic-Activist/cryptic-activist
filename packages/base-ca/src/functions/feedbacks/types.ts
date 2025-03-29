import { Prisma } from '@/services/prisma';

export type CreateFeedback = Prisma.FeedbackUpsertArgs;

export type CreateManyFeedbacks = Prisma.FeedbackCreateManyInput;

export type WhereFeedback = Prisma.FeedbackWhereUniqueInput;

export type UpdateFeedbackParams = {
  toUpdate: Prisma.FeedbackUpdateInput;
  where: Prisma.FeedbackWhereUniqueInput;
};

export type DeleteFeedbackParams = {
  where: Prisma.FeedbackWhereUniqueInput;
};

export type GetFeedbackParams = {
  where?: Prisma.FeedbackWhereInput;
  select?: Prisma.FeedbackSelect;
};

export type GetFeedbacksParams = {
  where?: Prisma.FeedbackWhereInput;
  limit?: number;
  select?: Prisma.FeedbackSelect;
  orderBy?: Prisma.FeedbackOrderByWithAggregationInput;
};

export type GetFeedbacksPaginationParams = {
  limit: number;
  offset?: number;
  cursor?: Prisma.FeedbackWhereUniqueInput & {
    id: string;
  };
  where?: Prisma.FeedbackWhereInput;
  select?: Prisma.FeedbackSelect;
  orderBy?: Prisma.FeedbackOrderByWithAggregationInput;
};
