'use client';

import type {
  ABI,
  FormattedTier,
  Period,
  PremiumPlans,
  PremiumSettings,
  ScheduledPremium,
  USDCToken,
  USDCTokenDetails,
} from './types';
import {
  approveToken,
  getTokenAllowance,
  subscribeToPremium as subscribeToPremiumEthers,
} from '@/services/ethers/premium';
import {
  changeSubscriptionTo,
  getUsdcTokenABI,
  subscribeToPremium as subscribeToPremiumService,
} from '@/services/premium';
import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

import { Token } from '@/store/blockchain/types';
import { formatNumberCompact } from '@/utils/numbers';
import { getTokenDecimals } from '@/services/ethers/escrow/erc20';
import { toTokenUnits } from '@/utils/blockchain';
import useApp from '../useApp';
import useBlockchain from '../useBlockchain';
import useContracts from '../useContracts';
import useTiers from '../useTiers';
import useUser from '../useUser';

// Constants
const DEFAULT_PREMIUM_DISCOUNT = 0;
const DEFAULT_MONTHLY_PRICE = 10;
const DEFAULT_YEARLY_PRICE = 100;
const DEFAULT_BASE_FEE = 5;
const EXAMPLE_AMOUNT = 10000;

// Helper Functions
const calculateEffectiveFee = (
  tradingFee: number,
  discount: number
): number => {
  return tradingFee * (1 - discount);
};

const formatFeePercentage = (fee: number): string => {
  return `${(fee * 100).toFixed(2)}%`;
};

const calculateSavingsPercentage = (
  monthly: number,
  yearly: number
): number => {
  return Math.round((1 - yearly / (monthly * 12)) * 100);
};

const formatVolumeRange = (
  volume: number,
  index: number,
  isLast: boolean,
  nextVolume?: number
): string => {
  if (index === 0) {
    return `0 - ${formatNumberCompact(volume)}`;
  }

  if (isLast) {
    return `${formatNumberCompact(volume)}+`;
  }

  return `${formatNumberCompact(volume)} - ${formatNumberCompact(nextVolume!)}`;
};

// Custom Hook
const usePremium = () => {
  // State
  const [selectedPlan, setSelectedPlan] = useState<Period>('YEARLY');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [currentPremiumSubscription, setCurrentPremiumSubscription] =
    useState<Period>();
  const [scheduledPremiumSubscription, setScheduledPremiumSubscription] =
    useState<ScheduledPremium>();
  const [usdcToken, setUsdcToken] = useState<USDCToken>();
  const [usdcTokenDetails, setUsdcTokenDetails] = useState<USDCTokenDetails>({
    abi: null,
    address: null,
  });

  // Hooks
  const { tiers } = useTiers(false);
  const {
    app: { settings },
  } = useApp();
  const { user } = useUser();
  const {
    blockchain: { account },
    tokens,
  } = useBlockchain();
  const {
    contracts: { premium },
  } = useContracts(false);

  // Extract settings with defaults
  const premiumSettings = (settings || {}) as PremiumSettings;
  const premiumDiscount =
    premiumSettings.premiumDiscount ?? DEFAULT_PREMIUM_DISCOUNT;
  const monthlyPrice =
    premiumSettings.premiumPriceMonthly ?? DEFAULT_MONTHLY_PRICE;
  const yearlyPrice =
    premiumSettings.premiumPriceYearly ?? DEFAULT_YEARLY_PRICE;

  // Calculated values
  const baseFee = user.tier?.tradingFee
    ? user.tier.tradingFee * 100
    : DEFAULT_BASE_FEE;

  const currentRate = useMemo(() => {
    if (
      user.tier?.tradingFee === undefined ||
      user.tier?.discount === undefined
    ) {
      return '';
    }
    return (baseFee - user.tier.discount).toString();
  }, [baseFee, user.tier]);

  // Premium calculations
  const totalDiscountPremium = useMemo(() => {
    if (!user.tier || !premiumDiscount) return null;
    return user.tier.tradingFee - user.tier.discount - premiumDiscount;
  }, [user.tier, premiumDiscount]);

  const totalDiscount = useMemo(() => {
    if (!user.tier || !premiumDiscount) return null;
    return user.tier.tradingFee - user.tier.discount;
  }, [user.tier, premiumDiscount]);

  // Savings calculation
  const savingExample = useMemo(() => {
    if (!totalDiscount || !totalDiscountPremium) return null;

    const currentCost = EXAMPLE_AMOUNT * (1 + totalDiscount);
    const premiumCost = EXAMPLE_AMOUNT * (1 + totalDiscountPremium);

    return Math.round((currentCost - premiumCost) * 100) / 100;
  }, [totalDiscount, totalDiscountPremium]);

  // Plans configuration
  const plans = useMemo((): PremiumPlans => {
    const planSavings = calculateSavingsPercentage(monthlyPrice, yearlyPrice);

    return {
      MONTHLY: {
        price: monthlyPrice,
        period: 'MONTHLY',
        savings: null,
        totalAnnual: monthlyPrice * 12,
      },
      YEARLY: {
        price: yearlyPrice,
        period: 'YEARLY',
        savings: planSavings,
        totalAnnual: yearlyPrice,
        billedAnnually: true,
      },
    };
  }, [monthlyPrice, yearlyPrice]);

  // Format tiers for display
  const formattedTiers = useMemo((): FormattedTier[] => {
    if (!tiers.data) return [];

    return tiers.data.map((tier: any, index: number) => {
      const isLast = index === tiers.data.length - 1;
      const nextVolume = isLast ? undefined : tiers.data[index + 1].volume;

      const effectiveFee = calculateEffectiveFee(
        tier.tradingFee,
        tier.discount
      );
      const tradingFeePercent = formatFeePercentage(effectiveFee);
      const volumeRange = formatVolumeRange(
        tier.volume,
        index,
        isLast,
        nextVolume
      );

      return {
        id: tier.id,
        name: tier.name,
        tradingFee: tradingFeePercent,
        volume: volumeRange,
      };
    });
  }, [tiers.data]);

  // Subscription mutation
  const subscribeToPremiumMutation = useMutation({
    mutationKey: ['subscribePremium'],
    mutationFn: async () => {
      if (!user.id || !account?.address) {
        throw new Error('User ID and account address are required');
      }

      setIsProcessing(true);

      const period = selectedPlan === 'YEARLY' ? 'YEARLY' : 'MONTHLY';

      try {
        const decimals = await getTokenDecimals({
          tokenContractDetails: usdcTokenDetails,
        });

        if (!decimals) {
          throw new Error('Unable to get token decimals');
        }

        const amount = period === 'MONTHLY' ? monthlyPrice : yearlyPrice;
        console.log({ amount, decimals });
        const baseUnits = toTokenUnits(amount, decimals);
        const approved = await approveToken({
          tokenContractDetails: usdcTokenDetails,
          premiumContractDetails: premium,
          amount: baseUnits,
        });

        console.log({ approved });

        if (!approved || approved.error) {
          throw new Error('Unable to approve token');
        }

        const allowance = await getTokenAllowance({
          premiumContractDetails: premium,
          tokenContractDetails: usdcTokenDetails,
        });

        console.log({ allowance });

        const subscribedSmartContractResponse = await subscribeToPremiumEthers(
          premium,
          period
        );

        console.log({ subscribedSmartContractResponse });

        if (
          subscribedSmartContractResponse.data &&
          subscribedSmartContractResponse.data?.paymentHash
        ) {
          const response = await subscribeToPremiumService(
            user.id,
            period,
            account.address
          );
          return response;
        }
      } finally {
        setIsProcessing(false);
        window.location.reload();
      }
    },
    onError: (error) => {
      console.error('Subscription error:', error);
      setIsProcessing(false);
    },
  });

  const changePremiumSubscriptionMutation = useMutation({
    mutationKey: ['changePremiumSubscription'],
    mutationFn: async () => {
      if (!user.id || !account?.address) {
        throw new Error('User ID and account address are required');
      }

      setIsProcessing(true);

      if (
        !user?.premiumPurchase ||
        (user?.premiumPurchase && user?.premiumPurchase.length === 0)
      ) {
        throw new Error('User not current subscribed');
      }

      const period = selectedPlan === 'YEARLY' ? 'YEARLY' : 'MONTHLY';

      try {
        const decimals = await getTokenDecimals({
          tokenContractDetails: usdcTokenDetails,
        });

        if (!decimals) {
          throw new Error('Unable to get token decimals');
        }

        const amount = period === 'MONTHLY' ? monthlyPrice : yearlyPrice;
        const baseUnits = toTokenUnits(amount, decimals);
        console.log({ amount, baseUnits });
        const approved = await approveToken({
          tokenContractDetails: usdcTokenDetails,
          premiumContractDetails: premium,
          amount: baseUnits,
        });

        console.log({ approved });

        if (!approved || approved.error) {
          throw new Error('Unable to approve token');
        }

        const allowance = await getTokenAllowance({
          premiumContractDetails: premium,
          tokenContractDetails: usdcTokenDetails,
        });

        console.log({ allowance });

        const subscribedSmartContractResponse = await subscribeToPremiumEthers(
          premium,
          period
        );

        console.log({ subscribedSmartContractResponse });

        if (
          subscribedSmartContractResponse.data &&
          subscribedSmartContractResponse.data?.paymentHash
        ) {
          const response = await changeSubscriptionTo(
            user.id,
            user.premiumPurchase[0].period === 'MONTHLY' ? 'YEARLY' : 'MONTHLY',
            account.address
          );

          return response;
        }
      } finally {
        setIsProcessing(false);
        window.location.reload();
      }
    },
    onError: (error) => {
      console.error('Subscription error:', error);
      setIsProcessing(false);
    },
  });

  const usdcTokenABIQuery = useQuery({
    queryKey: ['usdcTokenABIQuery'],
    queryFn: async () => {
      if (
        (!user.id || !account?.address) &&
        (!usdcToken || !usdcToken.abiUrl)
      ) {
        throw new Error('User ID and account address are required');
      }
      if (!usdcToken || !usdcToken.abiUrl) {
        throw new Error('USDC token or ABI URL is missing');
      }

      try {
        const response = await getUsdcTokenABI(usdcToken.abiUrl as string);

        return response;
      } finally {
        setIsProcessing(false);
      }
    },
    enabled: !!user.id && !!account?.address && !!usdcToken?.abiUrl,
  });

  const handleSubscribe = async () => {
    if (user.id) {
      await subscribeToPremiumMutation.mutateAsync();
    }
  };

  const handleChangeSubscription = async () => {
    if (user.id) {
      const changed = await changePremiumSubscriptionMutation.mutateAsync();
      return changed;
    }
  };

  useEffect(() => {
    if (user.premiumPurchase && user.premiumPurchase.length > 0) {
      const currentPremium = user.premiumPurchase.find(
        (purchase) => purchase.status === 'COMPLETED'
      );

      if (currentPremium) {
        setCurrentPremiumSubscription(currentPremium.period);
      }
      const scheduledPremium = user.premiumPurchase.find(
        (purchase) => purchase.status === 'SCHEDULED'
      );
      if (scheduledPremium) {
        setScheduledPremiumSubscription(scheduledPremium);
      }
    }
  }, [user.premiumPurchase]);

  useEffect(() => {
    if (tokens && tokens?.length > 0) {
      const usdc = tokens.find(
        (token) => token.cryptocurrency.coingeckoId === 'usd-coin'
      );

      if (!usdc) {
        return;
      }

      setUsdcToken(usdc);
    }
  }, [tokens]);

  useEffect(() => {
    if (usdcTokenABIQuery.data) {
      setUsdcTokenDetails({
        abi: usdcTokenABIQuery.data ?? null,
        address: usdcToken?.contractAddress ?? null,
      });
    }
  }, [usdcTokenABIQuery.data]);

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
    premiumDiscount: premiumDiscount || null,
    savingExample,
    amountExample: EXAMPLE_AMOUNT,
    totalDiscountPremium,
    plans,
    currentPremiumSubscription,
    changePremiumSubscriptionMutation,
    account,
    usdcTokenDetails,
    handleSubscribe,
    handleChangeSubscription,
    scheduledPremiumSubscription,
  };
};

export default usePremium;
