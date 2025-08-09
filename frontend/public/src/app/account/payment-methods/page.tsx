'use client';

import React from 'react';
import { validateWithAuthToken } from '@/services/user';
import { withAuth } from '@/hoc/withAuth';

const PaymentMethodPage = () => {
  return <div>PaymentMethodPage</div>;
};

export default withAuth(PaymentMethodPage);
