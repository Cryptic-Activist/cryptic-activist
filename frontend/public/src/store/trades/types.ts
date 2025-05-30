import { Cryptocurrency } from '../cryptocurrency/types';
import { Fiat } from '../fiat/types';

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
export type Chat = {
  id: string;
};

export type PaymentReceipt = {
  name: string;
  url: string;
};

export type Status =
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'DISPUTED'
  | 'EXPIRED';

export type Trade = {
  id?: string;
  cryptocurrency?: Cryptocurrency;
  cryptocurrencyAmount?: number;
  fiat?: Fiat;
  fiatAmount?: number;
  endedAt?: string;
  escrowReleasedAt?: string;
  status?: Status;
  blockchainTransactionHash?: string;
  exchangeRate?: number;
  startedAt?: string;
  expiredAt?: string;
  offer?: {
    timeLimit: number;
  };
  trader?: User;
  vendor?: User;
};

export type TradesStore = {
  trades: {
    data: Trade[];
    totalPages: number;
    currentPage: number;
    pageSize: number;
    setTradeValue: (params: Value, actionName?: `trades/${string}`) => void;
    resetTrades: () => void;
  };
};

export type TradesSetter = {
  data?: Trade[];
  totalPages?: number;
  currentPage?: number;
  pageSize?: number;
};

export type Value = TradesSetter;
