import { Cryptocurrency } from '../cryptocurrency/types';
import { Fiat } from '../fiat/types';
import { PaymentMethod } from '../paymentMethod/types';

type OfferType = 'sell' | 'buy';

type TradePricingType = 'market' | 'fixed';

export type TierName = 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';

export type Tier = {
  level: number;
  name: TierName;
};

export type KYC = {
  id?: string;
  status: 'VERIFIED' | 'REJECTED' | 'PENDING';
};

export type UserLanguage = {
  language: {
    name: string;
  };
};

export type Count = {
  blockers?: number;
  trusters?: number;
  feedbackTrader?: number;
  tradeVendor?: number;
};

export type FeedbacksVendor = {
  id?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  profileColor?: string;
};

export type Vendor = {
  _count?: Count;
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  profileColor: string;
  lastLoginAt: string;
  tier?: Tier;
  kyc?: KYC[];
  userLanguage?: UserLanguage[];
  feedbacksVendor?: FeedbacksVendor[];
};

export type Offer = {
  offer: {
    id?: string;
    cryptocurrency?: Cryptocurrency;
    fiat?: Fiat;
    vendor?: Vendor;
    kycOnly?: boolean;
    offerType?: OfferType;
    paymentMethodId?: string;
    pricingType?: TradePricingType;
    listAt?: number;
    limitMin?: number;
    limitMax?: number;
    timeLimit?: number;
    tags?: string[];
    label?: string;
    terms?: string;
    instructions?: string;
    trades?: any;
  };
};

export type OfferStore = {
  offer: {
    id?: string;
    cryptocurrency?: Cryptocurrency;
    fiat?: Fiat;
    paymentMethod?: PaymentMethod;
    vendor?: Vendor;
    offerType?: OfferType;
    paymentMethodId?: string;
    pricingType?: TradePricingType;
    kycOnly?: boolean;
    listAt?: number;
    limitMin?: number;
    limitMax?: number;
    timeLimit?: number;
    tags?: string[];
    label?: string;
    terms?: string;
    instructions?: string;
    trades?: any;
    setOfferValue: (params: Value, actionName?: `offer/${string}`) => void;
    setOffer: (offer: Value) => void;
    resetOffer: () => void;
  };
};

export type OfferSetter = {
  id?: string;
  cryptocurrency?: Cryptocurrency;
  fiat?: Fiat;
  paymentMethod?: PaymentMethod;
  vendor?: Vendor;
  offerType?: OfferType;
  paymentMethodId?: string;
  pricingType?: TradePricingType;
  listAt?: number;
  limitMin?: number;
  limitMax?: number;
  timeLimit?: number;
  tags?: string[];
  kycOnly?: boolean;
  label?: string;
  terms?: string;
  instructions?: string;
  trades?: any;
};

export type Value = OfferSetter;
