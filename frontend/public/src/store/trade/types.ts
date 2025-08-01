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

export type Admin = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
};

export type TradeDispute = {
  id: string;
  raisedBy: User;
  reason: string;
  resolutionNote?: string;
  resolvedAt: string;
  moderator: Admin;
  createdAt: string;
};

export type TradeEscrowDetails = {
  id: string;
  arbitratorWallet: string;
  buyerWallet: string;
  sellerWallet: string;
  feeRate: number;
  profitMargin: number;
  tradeDurationInSeconds: number;
  tradeAmount: string;
  buyerCollateral: string;
  sellerCollateral: string;
  sellerTotalFund: string;
  blockchainTradeId: string;
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

export type Token = {
  address: string;
  abi: { [key: string]: any };
};

export type Status =
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'DISPUTED'
  | 'EXPIRED';

export type Trade = {
  trade: {
    id?: string;
    cryptocurrency?: Cryptocurrency;
    fiat?: Fiat;
    paymentMethod?: PaymentMethod;
    paymentReceipt?: PaymentReceipt;
    status?: Status;
    vendor?: Vendor;
    trader?: Trader;
    offer?: OfferSetter;
    fiatAmount?: number;
    cryptocurrencyAmount?: number;
    exchangeRate?: number;
    escrowReleasedAt?: string;
    paymentConfirmedAt?: string;
    paidAt?: string;
    expiredAt?: string;
    startedAt?: string;
    createdAt?: string;
    endedAt?: string;
    fundedAt?: string;
    disputedAt?: string;
    blockchainTransactionHash?: string;
    traderWallet?: any;
    vendorWallet?: any;
    chat?: Chat;
    tradeDispute?: TradeDispute;
    vendorRejectedFunding?: boolean;
    traderRejectedFunding?: boolean;
    buyerId?: string;
    sellerId?: string;
    buyerFundedAt?: string;
    sellerFundedAt?: string;
    token?: Token;
  };
};

export type TradeStore = {
  trade: {
    id?: string;
    cryptocurrency?: Cryptocurrency;
    fiat?: Fiat;
    paymentMethod?: PaymentMethod;
    paymentReceipt?: PaymentReceipt;
    status?: Status;
    vendor?: Vendor;
    trader?: Trader;
    offer?: OfferSetter;
    fiatAmount?: number;
    cryptocurrencyAmount?: number;
    exchangeRate?: number;
    escrowReleasedAt?: string;
    paymentConfirmedAt?: string;
    paidAt?: string;
    expiredAt?: string;
    startedAt?: string;
    createdAt?: string;
    endedAt?: string;
    fundedAt?: string;
    disputedAt?: string;
    blockchainTransactionHash?: string;
    traderWallet?: any;
    vendorWallet?: any;
    vendorRejectedFunding?: boolean;
    traderRejectedFunding?: boolean;
    buyerId?: string;
    buyerFundedAt?: string;
    sellerId?: string;
    sellerFundedAt?: string;
    chat?: Chat;
    tradeDispute?: TradeDispute;
    tradeEscrowDetails?: TradeEscrowDetails;
    token?: Token;
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
  status?: Status;
  vendor?: Vendor;
  trader?: Trader;
  offer?: OfferSetter;
  fiatAmount?: number;
  cryptocurrencyAmount?: number;
  exchangeRate?: number;
  escrowReleasedAt?: string;
  paymentConfirmedAt?: string;
  paidAt?: string;
  expiredAt?: string;
  startedAt?: string;
  disputedAt?: string;
  createdAt?: string;
  endedAt?: string;
  fundedAt?: string;
  blockchainTransactionHash?: string;
  traderWallet?: any;
  vendorWallet?: any;
  chat?: Chat;
  tradeDispute?: TradeDispute;
  tradeEscrowDetails?: TradeEscrowDetails;
  vendorRejectedFunding?: boolean;
  traderRejectedFunding?: boolean;
  buyerId?: string;
  buyerFundedAt?: string;
  sellerId?: string;
  sellerFundedAt?: string;
  token?: Token;
};

export type Value = TradeSetter;
