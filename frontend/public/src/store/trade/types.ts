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

export type Vendor = User;
export type Trader = User;

export type PaymentReceipt = {
  name: string;
  url: string;
};

enum Status {
  PENDING,
  IN_PROGRESS,
  COMPLETED,
  CANCELLED,
  DISPUTED,
  EXPIRED,
}

export type Trade = {
  trade: {
    id?: string;
    cryptocurrency?: Cryptocurrency;
    fiat?: Fiat;
    paymentMethod?: PaymentMethod;
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
    status?: Status;
  };
};

export type TradeStore = {
  trade: {
    id?: string;
    cryptocurrency?: Cryptocurrency;
    fiat?: Fiat;
    paymentMethod?: PaymentMethod;
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
    status?: Status;
    setTradeValue: (params: Value, actionName?: `trade/${string}`) => void;
    setTrade: (trade: Value) => void;
    resetTrade: () => void;
  };
};

export type TradeSetter = {
  id?: string;
  cryptocurrency?: Cryptocurrency;
  fiat?: Fiat;
  paymentMethod?: PaymentMethod;
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
  status?: Status;
};

export type Value = TradeSetter;
