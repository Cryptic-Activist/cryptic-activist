import { Cryptocurrency } from '@/store/cryptocurrency/types';
import { Fiat } from '@/store/fiat/types';

type OfferType = 'sell' | 'buy';

type TradePricingType = 'market' | 'fixed';

export type CreateOffer = {
  cryptocurrency?: Cryptocurrency;
  fiat?: Fiat;
  vendorId?: string;
  offerType?: OfferType;
  paymentMethodId?: string;
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

export type CreateOfferState = CreateOffer;

export type CreateOfferSetter = CreateOffer;

export type SetCreateOfferValues = (params: CreateOfferSetter) => void;
