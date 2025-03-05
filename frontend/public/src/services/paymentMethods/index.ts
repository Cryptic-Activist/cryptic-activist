import { AxiosResponse, fetchGet } from '@/services/axios';

import { BACKEND } from '@/constants';

export const fetchPaymentMethods = async (): Promise<AxiosResponse | null> => {
  const response = await fetchGet(`${BACKEND}/payment-methods`);

  if (response.status !== 200) {
    return null;
  }

  return response;
};

export const fetchPaymentMethodsByCategory = async (
  categoryId: string
): Promise<AxiosResponse | null> => {
  const response = await fetchGet(
    `${BACKEND}/payment-methods/${categoryId}/all`
  );

  if (response.status !== 200) {
    return null;
  }

  return response;
};
