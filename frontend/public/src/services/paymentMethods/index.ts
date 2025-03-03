import { OFFER_API } from '@/constants';
import { AxiosResponse, fetchGet } from '@/services/axios';

export const fetchPaymentMethods = async (): Promise<AxiosResponse | null> => {
  const response = await fetchGet(`${OFFER_API}/payment-methods`);

  if (response.status !== 200) {
    return null;
  }

  return response;
};

export const fetchPaymentMethodsByCategory = async (
  categoryId: string
): Promise<AxiosResponse | null> => {
  const response = await fetchGet(
    `${OFFER_API}/payment-methods/${categoryId}/all`
  );

  if (response.status !== 200) {
    return null;
  }

  return response;
};
