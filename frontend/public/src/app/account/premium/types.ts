import { Period, ScheduledPremium } from '@/hooks/usePremium/types';

import { UseMutationResult } from '@tanstack/react-query';

// Types
export interface PlanType {
  price: number;
  period: string;
  savings?: number | null;
  totalAnnual: number;
  billedAnnually?: boolean;
}

// type PremiumPlans = Record<string, PlanType>;

export interface TierCardProps {
  tier: {
    id: string;
    name: string;
    volume: string;
    tradingFee: string;
  };
}

export interface CalculatorRowProps {
  label: string;
  value: string;
  isHighlighted?: boolean;
  isPremium?: boolean;
}

export interface FaqItemProps {
  question: string;
  answer: string;
}

export type PricingPlanProps = {
  selectedPlan: string;
  plans: Record<string, PlanType>;
  isProcessing: boolean;
  onPlanChange: (plan: Period) => void;
  onSubscribe: () => void;
  currentPremiumSubscription?: Period;
  scheduledPremiumSubscription?: ScheduledPremium;
  changePremiumSubscriptionMutation: any;
  userId?: string;
  wallet?: string;
  usdcTokenDetails: any;
  subscribeToPremiumMutation: UseMutationResult<any, Error, void, unknown>;
  handleChangeSubscription: () => void;
};

export type PlanCardProps = {
  plan: PlanType;
  selectedPlan: string;
  isProcessing: boolean;
  onSubscribe: () => void;
  currentPremiumSubscription?: Period;
  scheduledPremiumSubscription?: ScheduledPremium;
  changePremiumSubscriptionMutation: any;
  userId?: string;
  wallet?: string;
  usdcTokenDetails: any;
  subscribeToPremiumMutation: UseMutationResult<any, Error, void, unknown>;
  handleChangeSubscription: () => void;
};

export type FeeCalculatorProps = {
  user: any;
  baseFee: number;
  currentRate: string;
  premiumDiscount: number | null;
  totalDiscountPremium: number | null;
  amountExample: number;
  savingExample: number | null;
};
