import { Cryptocurrency } from '@/store/cryptocurrency/types';
import { Fiat } from '@/store/fiat/types';

type OfferType = 'sell' | 'buy';

type TradePricingType = 'market' | 'fixed';

export type SetCreateOfferValue = (
  value: Value,
  actionname: `createOffer/${string}`
) => void;

export type CreateOffer = {
  createOffer: {
    cryptocurrency?: Cryptocurrency;
    fiat?: Fiat;
    vendorId?: string;
    offerType?: OfferType;
    paymentMethodId?: string;
    paymentDetails?: string;
    isPaymentMethodCompleted?: boolean;
    pricingType?: TradePricingType;
    listAt?: number;
    limitMin?: number;
    limitMax?: number;
    timeLimit?: number;
    isTradePricingCompleted?: boolean;
    tags?: string[];
    label?: string;
    terms?: string;
    instructions?: string;
    isTradeInstructionsCompleted?: boolean;
    isFilled?: boolean;
    isSubmitted?: boolean;
    setCreateOfferValue: SetCreateOfferValue;
    setCreateOffer: (createOffer: Value) => void;
    resetCreateOffer: () => void;
  };
};

export type CreateOfferSetter = {
  cryptocurrency?: Cryptocurrency;
  fiat?: Fiat;
  vendorId?: string;
  offerType?: OfferType;
  paymentMethodId?: string;
  paymentDetails?: string;
  isPaymentMethodCompleted?: boolean;
  pricingType?: TradePricingType;
  listAt?: number;
  limitMin?: number;
  limitMax?: number;
  timeLimit?: number;
  isTradePricingCompleted?: boolean;
  tags?: string[];
  label?: string;
  terms?: string;
  instructions?: string;
  isTradeInstructionsCompleted?: boolean;
  isFilled?: boolean;
  isSubmitted?: boolean;
};

export type CreateOfferStore = CreateOffer;

export type Value = CreateOfferSetter;

export type CreateOfferProp = CreateOfferSetter;
