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
  GetFeedbacksCountParams,
  GetFeedbacksPaginationParams,
  GetFeedbacksParams,
  UpdateFeedbackParams,
} from './types';

export const createFeedback = async (params: CreateFeedback) => {
  try {
    const newFeedback = await prisma.feedback.upsert(params);

    return newFeedback;
  } catch (error: any) {
    throw Error(error);
  }
};

export const createManyFeedbacks = async (
  params: CreateManyFeedbacks[]
) => {
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
}: UpdateFeedbackParams) => {
  const updated = await prisma.feedback.update({
    where,
    data: toUpdate,
  });

  return updated;
};

export const deleteFeedback = async ({
  where,
}: DeleteFeedbackParams) => {
  const deleted = await prisma.feedback.delete({
    where,
  });
  return deleted;
};

export const getFeedback = async ({
  where,
  select,
}: GetFeedbackParams) => {
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
}: GetFeedbacksParams) => {
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
}: GetFeedbacksPaginationParams) => {
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

export const countFeedbacks = async ({
  where,
}: GetFeedbacksCountParams) => {
  const count = await prisma.feedback.count({
    ...(where && { where }),
  });
  return count;
};
