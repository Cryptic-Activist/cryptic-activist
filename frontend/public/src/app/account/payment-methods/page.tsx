import React from 'react';
import { validateWithAuthToken } from '@/services/user';
import { withAuthAdvanced } from '@/hoc/withAuth';

const PaymentMethodPage = () => {
  return <div>PaymentMethodPage</div>;
};

export default withAuthAdvanced(PaymentMethodPage, {
  validateToken: validateWithAuthToken,
});
