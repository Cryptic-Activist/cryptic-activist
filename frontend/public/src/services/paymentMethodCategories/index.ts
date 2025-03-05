import { AxiosResponse, fetchGet } from '@/services/axios';

import { BACKEND } from '@/constants';

export const fetchPaymentMethodCategories =
  async (): Promise<AxiosResponse | null> => {
    const response = await fetchGet(
      `${BACKEND}/offers/payment-method/categories`
    );

    if (response.status !== 200) {
      return null;
    }

    return response;
  };
