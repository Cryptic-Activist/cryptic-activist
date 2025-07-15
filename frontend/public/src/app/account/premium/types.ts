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
