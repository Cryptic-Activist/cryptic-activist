import { OnSubmitFeedback, OnSubmitMoreEvidences } from './types';

import { BACKEND } from '@/constants';
import { fetchPost } from '../axios';
import { getBearerToken } from '@/utils';

export const onSubmitFeedback = async (params: OnSubmitFeedback) => {
  const bearerToken = getBearerToken();
  const response = await fetchPost(
    BACKEND + '/trades/trade/' + params.tradeId + '/feedback',
    {
      type: params.type,
      message: params.message,
    },
    {
      Authorization: bearerToken,
    }
  );

  if (response.status !== 200) {
    return false;
  }

  return response.data;
};

export const submitMoreEvidences = async (params: OnSubmitMoreEvidences) => {
  const bearerToken = getBearerToken();
  const response = await fetchPost(
    BACKEND + '/disputes/dispute/quick-actions/more-evidences/add',
    {
      disputeId: params.disputeId,
      evidences: params.evidences,
      userId: params.userId,
    },
    {
      Authorization: bearerToken,
    }
  );

  if (response.status !== 200) {
    return false;
  }

  return response.data;
};
