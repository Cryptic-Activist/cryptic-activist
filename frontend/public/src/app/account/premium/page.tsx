'use client';

import { Button } from '@/components';
import React from 'react';
import { usePremium } from '@/hooks';

const PremiumPage = () => {
  const { subscribeToPremiumMutation } = usePremium();

  return (
    <div>
      <h1>Subscribe to Premium</h1>
      <Button onClick={() => subscribeToPremiumMutation.mutate('monthly')}>
        Montly
      </Button>
      <Button onClick={() => subscribeToPremiumMutation.mutate('yearly')}>
        Yearly
      </Button>
    </div>
  );
};

export default PremiumPage;
