import { AxiosResponse, fetchGet } from '@/services/axios';

import { OFFER_API } from '@/constants';

export const fetchPaymentMethodCategories =
  async (): Promise<AxiosResponse | null> => {
    const response = await fetchGet(`${OFFER_API}/payment-method/categories`);

    if (response.status !== 200) {
      return null;
    }

    return response;
  };
