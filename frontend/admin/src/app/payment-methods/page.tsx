'use client';

import { PaymentMethodsList as List } from '@/components/lists';
import { usePaymentMethods } from '@/hooks';

const PaymentMethods = () => {
	const { paymentMethods } = usePaymentMethods(true);

	return <List items={paymentMethods.data} />;
};

export default PaymentMethods;
