import { BACKEND } from '@/constants';
import { fetchGet } from '@/services/axios';

export const fetchPaymentMethodCategories = async () => {
  const response = await fetchGet(
    `${BACKEND}/offers/payment-method/categories`
  );

  if (response.status !== 200) {
    return null;
  }

  return response.data;
};
