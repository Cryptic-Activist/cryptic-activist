import { Cryptocurrency } from '../cryptocurrency/types';
import { Fiat } from '../fiat/types';

type OfferType = 'sell' | 'buy';

type TradePricingType = 'market' | 'fixed';

type Vendor = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  profileColor: string;
  lastLoginAt: string;
  createdAt: string;
  updatedAt: string;
};

export type Offer = {
  _count?: {
    trades?: number;
    feedbacks?: number;
  };
  id: string;
  cryptocurrency: Cryptocurrency;
  fiat: Fiat;
  vendor: Vendor;
  offerType: OfferType;
  paymentMethodId: string;
  pricingType: TradePricingType;
  listAt: number;
  limitMin: number;
  limitMax: number;
  timeLimit: number;
  averageTradeSpeed: number;
  tags: string[];
  label: string;
  terms: string;
  instructions: string;
};

export type MyOffersStore = {
  myOffers: {
    data: Offer[];
    totalPages: number;
    currentPage: number;
    pageSize: number;
    hasError: boolean;
    setMyOffersValue: (value: Value, actionName?: `myOffers/${string}`) => void;
    setHasMore: (hasMore: boolean) => void;
    setHasError: (hasError: boolean) => void;
  };
};

export type MyOffersSetter = {
  data?: {
    _count?: {
      trades?: number;
      feedbacks?: number;
    };
    id: string;
    cryptocurrency: Cryptocurrency;
    fiat: Fiat;
    vendor: Vendor;
    offerType: OfferType;
    paymentMethodId: string;
    pricingType: TradePricingType;
    listAt: number;
    limitMin: number;
    limitMax: number;
    timeLimit: number;
    averageTradeSpeed: number;
    tags: string[];
    label: string;
    terms: string;
    instructions: string;
  }[];
  totalPages?: number;
  currentPage?: number;
  pageSize?: number;
};

export type Value = MyOffersSetter;
