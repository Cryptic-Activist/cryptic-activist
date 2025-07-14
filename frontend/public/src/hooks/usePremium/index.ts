'use client';

import { Period } from './types';
import { formatNumberCompact } from '@/utils/numbers';
import { subscribeToPremium } from '@/services/premium';
import useApp from '../useApp';
import useBlockchain from '../useBlockchain';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import useTiers from '../useTiers';
import useUser from '../useUser';

const usePremium = () => {
  const { tiers } = useTiers(false);
  const {
    app: { settings },
  } = useApp();
  const { user } = useUser();
  const {
    blockchain: { account },
  } = useBlockchain();

  const premiumDiscount = (
    settings && settings['premiumDiscount'] ? settings['premiumDiscount'] : null
  ) as number;
  const totalDiscountPremium =
    user.tier && premiumDiscount
      ? user?.tier.tradingFee - user.tier.discount - premiumDiscount
      : null;
  const totalDiscount =
    user.tier && premiumDiscount
      ? user?.tier.tradingFee - user.tier.discount
      : null;
  const amountExample = 10000;
  const saving = totalDiscount
    ? amountExample * (1 + totalDiscount) - amountExample
    : null;
  const savingPremium = totalDiscountPremium
    ? amountExample * (1 + totalDiscountPremium) - amountExample
    : null;
  const savingExample = saving && savingPremium ? saving - savingPremium : null;
  const baseFee = user.tier ? user?.tier?.tradingFee * 100 : 5;
  const currentRate =
    user.tier?.tradingFee !== undefined && user.tier?.discount !== undefined
      ? baseFee - user.tier?.discount
      : '';

  const [selectedPlan, setSelectedPlan] = useState('annual');
  const [isProcessing, setIsProcessing] = useState(false);

  const settingMonthlyPremium = settings ? settings['premiumPriceMonthly'] : 10;
  const settingYearlyPremium = settings ? settings['premiumPriceYearly'] : 100;
  const planSaving = parseInt(
    (1 - settingYearlyPremium / (settingMonthlyPremium * 12)) * 100
  );

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

  const plans = {
    monthly: {
      price: settingMonthlyPremium,
      period: 'month',
      savings: null,
      totalAnnual: settingMonthlyPremium * 12,
      // handler: subscribeToPremiumMutation.mutateAsync('MONTHLY'),
    },
    annual: {
      price: settingYearlyPremium,
      period: 'month',
      savings: planSaving,
      totalAnnual: settingMonthlyPremium * 12,
      billedAnnually: true,
      // handler: subscribeToPremiumMutation.mutateAsync('YEARLY'),
    },
  };

  const formattedTiers = tiers.data.map(
    ({ volume, tradingFee, discount, ...rest }, index) => {
      const isFirst = index === 0;
      const isLast = index === tiers?.data.length - 1;

      // Calculate effective fee after discount
      const effectiveFee = tradingFee * (1 - discount);
      const tradingFeePercent = `${(effectiveFee * 100).toFixed(2)}%`;

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
    user,
    premiumDiscount,
    savingExample,
    amountExample,
    totalDiscountPremium,
    plans,
  };
};

export default usePremium;
