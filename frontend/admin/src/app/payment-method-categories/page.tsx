'use client';

import { PaymentMethodCategoriesList as List } from '@/components/lists';
import { usePaymentMethodCategories } from '@/hooks';

const PaymentMethodCategories = () => {
	const { paymentMethodCategories } = usePaymentMethodCategories(true);

	return <List items={paymentMethodCategories.data} />;
};

export default PaymentMethodCategories;
