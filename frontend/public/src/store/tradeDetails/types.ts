import { Cryptocurrency } from '../cryptocurrency/types';
import { Fiat } from '../fiat/types';
import type { OfferSetter } from '../offer/types';
import { PaymentMethod } from '../paymentMethod/types';

export type TierName = 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';

export type Tier = {
  level: number;
  name: TierName;
};

export type KYC = {
  id?: string;
};

export type UserLanguage = {
  language: {
    name: string;
  };
};

export type Count = {
  blockers?: number;
  trusters?: number;
  feedbackTradeDetailsr?: number;
  tradeVendor?: number;
};

export type FeedbacksVendor = {
  id?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  profileColor?: string;
};

export type User = {
  _count?: Count;
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  profileColor: string;
  lastLoginAt: string;
  tier?: Tier;
  kyc?: KYC;
  userLanguage?: UserLanguage[];
  feedbacksVendor?: FeedbacksVendor[];
};

export type PaymentDetails = {
  instructions: string;
};

export type Vendor = User;
export type Trader = User;
export type Chat = {
  id: string;
};

export type PaymentReceipt = {
  name: string;
  url: string;
};

export enum Status {
  PENDING,
  IN_PROGRESS,
  COMPLETED,
  CANCELLED,
  DISPUTED,
  EXPIRED,
}

export type TradeDetails = {
  tradeDetails: {
    id?: string;
    cryptocurrency?: Cryptocurrency;
    fiat?: Fiat;
    paymentMethod?: PaymentMethod;
    paymentDetails?: PaymentDetails;
    paymentReceipt?: PaymentReceipt;
    vendor?: Vendor;
    trader?: Trader;
    offer?: OfferSetter;
    endedAt?: string;
    escrowReleaseDate?: string;
    expiredAt?: string;
    fiatAmount?: number;
    cryptocurrencyAmount?: number;
    paid?: boolean;
    paymentConfirmed?: boolean;
    status?: Status;
    traderWalletAddress?: string;
    vendorWalletAddress?: string;
    chat?: Chat;
  };
};

export type TradeDetailsStore = {
  tradeDetails: {
    id?: string;
    cryptocurrency?: Cryptocurrency;
    fiat?: Fiat;
    paymentMethod?: PaymentMethod;
    paymentDetails?: PaymentDetails;
    paymentReceipt?: PaymentReceipt;
    vendor?: Vendor;
    trader?: Trader;
    offer?: OfferSetter;
    endedAt?: string;
    escrowReleaseDate?: string;
    expiredAt?: string;
    fiatAmount?: number;
    cryptocurrencyAmount?: number;
    paid?: boolean;
    paymentConfirmed?: boolean;
    status?: Status;
    traderWalletAddress?: string;
    vendorWalletAddress?: string;
    chat?: Chat;
    setTradeDetailsValue: (
      params: Value,
      actionName?: `tradeDetails/${string}`
    ) => void;
    setTradeDetails: (trade: Value) => void;
    resetTradeDetails: () => void;
  };
};

export type TradeDetailsSetter = {
  id?: string;
  cryptocurrency?: Cryptocurrency;
  fiat?: Fiat;
  paymentMethod?: PaymentMethod;
  paymentDetails?: PaymentDetails;
  paymentReceipt?: PaymentReceipt;
  vendor?: Vendor;
  trader?: Trader;
  offer?: OfferSetter;
  endedAt?: string;
  escrowReleaseDate?: string;
  expiredAt?: string;
  fiatAmount?: number;
  cryptocurrencyAmount?: number;
  paid?: boolean;
  paymentConfirmed?: boolean;
  status?: Status;
  traderWalletAddress?: string;
  vendorWalletAddress?: string;
  chat?: Chat;
};

export type Value = TradeDetailsSetter;
