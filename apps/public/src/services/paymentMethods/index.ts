import { BACKEND } from '@/constants';
import { fetchGet } from '@/services/axios';

export const fetchPaymentMethods = async () => {
  const response = await fetchGet(`${BACKEND}/offers/payment-methods`);

  if (response.status !== 200) {
    return null;
  }

  return response.data;
};

export const fetchPaymentMethodsByCategory = async (categoryId: string) => {
  const response = await fetchGet(
    `${BACKEND}/offers/payment-methods/${categoryId}/all`
  );

  if (response.status !== 200) {
    return null;
  }

  return response.data;
};
