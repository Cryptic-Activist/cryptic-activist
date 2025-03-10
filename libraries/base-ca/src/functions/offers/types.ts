import { DateType } from '@/functions/types';
import { GetCryptocurrencyReturnType } from '../cryptocurrencies/types';
import { GetFiatReturnType } from '../fiats/types';
import { GetLanguageReturnType } from '../languages/types';
import { GetUserReturnType } from '@/functions/users/types';
import { Prisma } from '@prisma/client';

export type UpdateTagsPrismaType =
  Prisma.StringFieldUpdateOperationsInput;
export type GetTradeInstructionsTagsPrismaType =
  Prisma.StringNullableListFilter;

export type CreateOfferParams = {
  vendorId: string;
  cryptocurrencyId: string;
  paymentMethodId: string;
  fiatId: string;
  offerType: string;
  pricingType: string;
  listAt: number;
  limitMin: number;
  limitMax: number;
  timeLimit: number;
  tags: string[];
  label: string;
  terms: string;
  instructions: string;
};

export type OfferDynamicType = {
  id?: string;
  vendorId?: string;
  cryptocurrencyId?: string;
  paymentMethodId?: string;
  fiatId?: string;
  offerType?: string;
  pricingType?: string;
  listAt?: number;
  limitMin?: number;
  limitMax?: number;
  timeLimit?: number;
  tags?: string[];
  label?: string;
  terms?: string;
  instructions?: string;
  isDeleted?: boolean;
  whenDeleted?: DateType;
  createdAt?: DateType;
  updatedAt?: DateType;
};

export type UpdateOfferWhereType = OfferDynamicType;

export type UpdateOfferToUpdateType = OfferDynamicType;

export type DeleteOfferWhereType = OfferDynamicType;

export type GetOfferWhereType = OfferDynamicType;

export type OfferAssociationsArrayType = {
  vendor: boolean;
  cryptocurrency: boolean;
  paymentMethod: boolean;
  fiat: boolean;
  feedbacks: boolean;
  trades: boolean;
};
