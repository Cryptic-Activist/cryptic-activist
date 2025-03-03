import { Feedback, prisma } from '../../services/prisma';
import { CreateFeedbackParams, WhereFeedbackParams } from './types';

export const createFeedback = async (
  params: CreateFeedbackParams
): Promise<Feedback> => {
  try {
    const feedback = await prisma.feedback.findFirst({
      where: params,
    });

    if (feedback) {
      return feedback;
    }

    const newFeedback = await prisma.feedback.create({
      data: params,
    });

    return newFeedback;
  } catch (error: any) {
    throw Error(error);
  }
};

export const updateFeedback = async (
  toUpdate: WhereFeedbackParams,
  where: WhereFeedbackParams
): Promise<Feedback> => {
  const updated = await prisma.feedback.update({
    where,
    data: toUpdate,
  });

  return updated;
};

export const deleteFeedback = async (
  where: WhereFeedbackParams
): Promise<Feedback> => {
  const deleted = await prisma.feedback.delete({ where });
  return deleted;
};

export const getFeedback = async (
  where: WhereFeedbackParams
): Promise<Feedback | null> => {
  const feedback = await prisma.feedback.findFirst({
    where,
  });

  if (!feedback) return null;

  return feedback;
};

export const getFeedbacks = async (
  where?: WhereFeedbackParams,
  limit?: number
): Promise<Feedback[]> => {
  const feedback = await prisma.feedback.findMany({
    where,
    take: limit,
  });

  return feedback;
};

export const getFeedbacksPagination = async (
  limit: number,
  offset: number,
  where?: WhereFeedbackParams
): Promise<Feedback[]> => {
  const feedbacks = await prisma.feedback.findMany({
    take: limit,
    skip: offset,
    where,
  });

  return feedbacks;
};
