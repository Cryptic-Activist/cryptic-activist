import { Token } from '@/store/blockchain/types';

export type Period = 'MONTHLY' | 'YEARLY';

// Types
export interface PremiumPlan {
  price: number;
  period: Period;
  savings?: number | null;
  totalAnnual: number;
  billedAnnually?: boolean;
}

export interface PremiumPlans {
  MONTHLY: PremiumPlan;
  YEARLY: PremiumPlan;
}

export interface FormattedTier {
  id: string;
  name: string;
  volume: string;
  tradingFee: string;
}

export interface PremiumSettings {
  premiumDiscount?: number;
  premiumPriceMonthly?: number;
  premiumPriceYearly?: number;
}

export interface UsePremiumReturn {
  subscribeToPremiumMutation: any;
  changePremiumSubscriptionMutation: any;
  baseFee: number;
  currentRate: string;
  tiers: any;
  formattedTiers: FormattedTier[];
  selectedPlan: Period;
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
  setSelectedPlan: (plan: Period) => void;
  user: any;
  premiumDiscount: number | null;
  savingExample: number | null;
  amountExample: number;
  totalDiscountPremium: number | null;
  plans: PremiumPlans;
  currentPremiumSubscription?: Period;
}

export type ABI = { [key: string]: any };

export type USDCToken = Token;
export type USDCTokenDetails = {
  abi: ABI | null;
  address: string | null;
};

export type ScheduledPremium = {
  period: Period;
  startsAt: string;
};
