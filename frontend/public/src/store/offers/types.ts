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
  tags: string[];
  label: string;
  terms: string;
  instructions: string;
};

type Cursor = string;

export type OffersStore = {
  offers: {
    data: Offer[];
    cursor: string | null;
    hasMore: boolean;
    hasError: boolean;
    setOffersValue: (params: {
      value: Value;
      actionName?: `offers/${string}`;
      cursor?: Cursor | null;
      hasMore?: boolean;
    }) => void;
    setOffers: (params: {
      offers: Offer[];
      cursor: Cursor | null;
    }) => Promise<void>;
    setHasMore: (hasMore: boolean) => void;
    setHasError: (hasError: boolean) => void;
  };
};

export type OffersSetter = {
  data: {
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
    tags: string[];
    label: string;
    terms: string;
    instructions: string;
  }[];
};

export type Value = OffersSetter;
