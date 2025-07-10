'use client';

import { Button } from '@/components';
import React from 'react';
import { usePremium } from '@/hooks';
import { validateWithAuthToken } from '@/services/user';
import { withAuthAdvanced } from '@/hoc/withAuth';

const PremiumPage = () => {
  const { subscribeToPremiumMutation } = usePremium();

  return (
    <div>
      <h1>Subscribe to Premium</h1>
      <Button onClick={() => subscribeToPremiumMutation.mutate('MONTHLY')}>
        Montly
      </Button>
      <Button onClick={() => subscribeToPremiumMutation.mutate('YEARLY')}>
        Yearly
      </Button>
    </div>
  );
};

export default withAuthAdvanced(PremiumPage, {
  validateToken: validateWithAuthToken,
});
