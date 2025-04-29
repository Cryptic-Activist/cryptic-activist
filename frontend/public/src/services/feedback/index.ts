import { BACKEND } from '@/constants';
import { OnSubmitFeedback } from './types';
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
