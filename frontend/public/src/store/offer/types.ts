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
  offer: {
    id?: string;
    cryptocurrency?: Cryptocurrency;
    fiat?: Fiat;
    vendor?: Vendor;
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
  };
};

export type OfferStore = {
  offer: {
    id?: string;
    cryptocurrency?: Cryptocurrency;
    fiat?: Fiat;
    vendor?: Vendor;
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
    setOfferValue: (params: Value, actionName?: `offer/${string}`) => void;
    setOffer: (offer: Value) => void;
    resetOffer: () => void;
  };
};

export type OfferSetter = {
  id?: string;
  cryptocurrency?: Cryptocurrency;
  fiat?: Fiat;
  vendor?: Vendor;
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
};

export type Value = OfferSetter;
