'use client';

import { PaymentMethodCategoriesList as List } from '@/components/lists';
import { usePaymentMethodCategories } from '@/hooks';
import { withAuth } from '@/hoc/withAuth';

const PaymentMethodCategories = () => {
	const { paymentMethodCategories } = usePaymentMethodCategories(true);

	return <List items={paymentMethodCategories.data} />;
};

export default withAuth(PaymentMethodCategories, {
	roles: ['SUPER_ADMIN'],
});
