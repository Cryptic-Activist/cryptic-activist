import type { PaymentMethodCategory } from '@/stores/paymentMethodCategories/types';

export const mapPaymentMethodCategories = (
  data: PaymentMethodCategory[],
  asSelect?: boolean
) => {
  const mapped = data.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const concat = [{ label: '-------', value: '' }].concat(...mapped);

  return concat;
};
