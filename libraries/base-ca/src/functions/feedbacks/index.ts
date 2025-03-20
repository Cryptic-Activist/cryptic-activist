import {
  BatchPayload,
  Feedback,
  prisma,
} from '../../services/prisma';
import {
  CreateFeedback,
  CreateManyFeedbacks,
  DeleteFeedbackParams,
  GetFeedbackParams,
  GetFeedbacksPaginationParams,
  GetFeedbacksParams,
  UpdateFeedbackParams,
} from './types';

export const createFeedback = async (
  params: CreateFeedback
): Promise<Feedback> => {
  try {
    const newFeedback = await prisma.feedback.upsert(params);

    return newFeedback;
  } catch (error: any) {
    throw Error(error);
  }
};

export const createManyFeedbacks = async (
  params: CreateManyFeedbacks[]
): Promise<BatchPayload> => {
  try {
    const newFeedbacks = await prisma.feedback.createMany({
      data: params,
    });

    return newFeedbacks;
  } catch (error: any) {
    throw Error(error);
  }
};

export const updateFeedback = async ({
  toUpdate,
  where,
}: UpdateFeedbackParams): Promise<Feedback> => {
  const updated = await prisma.feedback.update({
    where,
    data: toUpdate,
  });

  return updated;
};

export const deleteFeedback = async ({
  where,
}: DeleteFeedbackParams): Promise<Feedback> => {
  const deleted = await prisma.feedback.delete({
    where,
  });
  return deleted;
};

export const getFeedback = async ({
  where,
  select,
}: GetFeedbackParams): Promise<Feedback | null> => {
  const feedback = await prisma.feedback.findFirst({
    ...(select && { select }),
    where,
  });

  if (!feedback) {
    return null;
  }

  return feedback;
};

export const getFeedbacks = async ({
  limit,
  where,
  select,
}: GetFeedbacksParams): Promise<Feedback[]> => {
  const feedbacks = await prisma.feedback.findMany({
    ...(limit && { take: limit }),
    ...(select && { select }),
    where,
  });

  return feedbacks;
};

export const getFeedbacksPagination = async ({
  limit,
  select,
  where,
  offset,
  cursor,
  orderBy,
}: GetFeedbacksPaginationParams): Promise<Feedback[]> => {
  const feedbacks = await prisma.feedback.findMany({
    take: limit,
    ...(offset && { skip: offset }),
    ...(select && { select }),
    ...(cursor && { cursor }),
    ...(orderBy && { orderBy }),
    where,
  });

  return feedbacks;
};

export const countFeedbacks = async () => {
  const count = await prisma.feedback.count();
  return count;
};
