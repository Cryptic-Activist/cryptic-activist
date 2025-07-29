'use client';

import { PaymentMethodsList as List } from '@/components/lists';
import { usePaymentMethods } from '@/hooks';
import { withAuth } from '@/hoc/withAuth';

const PaymentMethods = () => {
	const { paymentMethods } = usePaymentMethods(true);

	return <List items={paymentMethods.data} />;
};

export default withAuth(PaymentMethods, {
	roles: ['SUPER_ADMIN'],
});
