import { BACKEND } from '@/constants';
import { fetchGet } from '@/services/axios';

export const fetchPaymentDetails = async (userId: string) => {
  const response = await fetchGet(
    `${BACKEND}/offers/payment-details/${userId}`
  );

  if (response.status !== 200) {
    return null;
  }

  return response.data;
};
