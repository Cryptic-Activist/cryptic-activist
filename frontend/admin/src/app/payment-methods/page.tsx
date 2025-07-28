'use client';

import { PaymentMethodsList as List } from '@/components/lists';
import { usePaymentMethods } from '@/hooks';
import { withAuthAdvanced } from '@/hoc/withAuth';

const PaymentMethods = () => {
	const { paymentMethods } = usePaymentMethods(true);

	return <List items={paymentMethods.data} />;
};

export default withAuthAdvanced(PaymentMethods, {
	roles: ['SUPER_ADMIN']
});
