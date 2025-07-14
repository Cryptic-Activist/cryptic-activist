'use client';

import { Period } from './types';
import { formatNumberCompact } from '@/utils/numbers';
import { subscribeToPremium } from '@/services/premium';
import useBlockchain from '../useBlockchain';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import useTiers from '../useTiers';
import useUser from '../useUser';

const usePremium = () => {
  const { tiers } = useTiers(false);
  const { user } = useUser();
  const {
    blockchain: { account },
  } = useBlockchain();

  const [selectedPlan, setSelectedPlan] = useState('annual');
  const [isProcessing, setIsProcessing] = useState(false);

  const baseFee = user.tier ? user?.tier?.tradingFee * 100 : 5;
  const currentRate =
    user.tier?.tradingFee !== undefined && user.tier?.discount !== undefined
      ? baseFee - user.tier?.discount
      : '';

  const subscribeToPremiumMutation = useMutation({
    mutationKey: ['subscribePremium'],
    mutationFn: async (period: Period) => {
      if (user.id && account?.address) {
        const response = await subscribeToPremium(
          user.id,
          period,
          account?.address
        );
        return response;
      }
    },
  });

  const handleSubscribe = async () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      alert('Premium subscription activated! Welcome to Premium.');
    }, 2000);
  };

  const formattedTiers = tiers.data.map(
    ({ volume, tradingFee, discount, ...rest }, index) => {
      const isFirst = index === 0;
      const isLast = index === tiers?.data.length - 1;
      const tradingFeePercent =
        discount === 0
          ? `${(tradingFee * 100).toFixed(2)}%`
          : `${(tradingFee * discount * 100).toFixed(2)}%`;

      if (isFirst) {
        return {
          ...rest,
          tradingFee: tradingFeePercent,
          volume: `0 - ${formatNumberCompact(volume)}`,
        };
      }
      if (isLast) {
        return {
          ...rest,
          tradingFee: tradingFeePercent,
          volume: `${formatNumberCompact(volume)}+`,
        };
      }

      const nextVolume = tiers.data[index + 1].volume;

      return {
        ...rest,
        tradingFee: tradingFeePercent,
        volume: `${formatNumberCompact(volume)} - ${formatNumberCompact(
          nextVolume
        )}`,
      };
    }
  );

  return {
    subscribeToPremiumMutation,
    baseFee,
    currentRate,
    tiers,
    formattedTiers,
    selectedPlan,
    isProcessing,
    setIsProcessing,
    setSelectedPlan,
    handleSubscribe,
    user,
  };
};

export default usePremium;
