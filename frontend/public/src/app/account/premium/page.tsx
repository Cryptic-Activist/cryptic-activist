'use client';

import { Button } from '@/components';
import React from 'react';
import { usePremium } from '@/hooks';

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

export default PremiumPage;
