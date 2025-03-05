import { DateType } from '@/functions/types';
import { GetUserReturnType } from '@/functions/users/types';
import { Prisma } from '@prisma/client';

import { GetCryptocurrencyReturnType } from '../cryptocurrencies/types';
import { GetFiatReturnType } from '../fiats/types';
import { GetLanguageReturnType } from '../languages/types';

export type CreateTradeInstructionsTagsPrismaType =
  Prisma.StringNullableListFilter;
export type UpdateTradeInstructionsTagsPrismaType =
  Prisma.StringFieldUpdateOperationsInput;
export type GetTradeInstructionsTagsPrismaType =
  Prisma.StringNullableListFilter;

export type CreateOfferParams = {
  vendorId: string;
  cryptocurrencyId: string;
  paymentMethodId: string;
  fiatId: string;
  paymentMethodType: string;
  tradePricingType: string;
  tradePricingListAt: number;
  tradePricingTradeLimitsMin: number;
  tradePricingTradeLimitsMax: number;
  tradePricingTimeLimit: number;
  tradeInstructionsTags: string[];
  tradeInstructionsLabel: string;
  tradeInstructionsTerms: string;
  tradeInstructionsInstructions: string;
};

export type OfferDynamicType = {
  id?: string;
  vendorId?: string;
  cryptocurrencyId?: string;
  paymentMethodId?: string;
  fiatId?: string;
  paymentMethodType?: string;
  tradePricingType?: string;
  tradePricingListAt?: number;
  tradePricingTradeLimitsMin?: number;
  tradePricingTradeLimitsMax?: number;
  tradePricingTimeLimit?: number;
  tradeInstructionsTags?: string[];
  tradeInstructionsLabel?: string;
  tradeInstructionsTerms?: string;
  tradeInstructionsInstructions?: string;
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

export type GetOfferReturnType = {
  id: string;
  vendorId: string;
  cryptocurrencyId: string;
  paymentMethodId: string;
  fiatId: string;
  paymentMethodType: string;
  tradePricingType: string;
  tradePricingListAt: number;
  tradePricingTradeLimitsMin: number;
  tradePricingTradeLimitsMax: number;
  tradePricingTimeLimit: number;
  tradeInstructionsTags: string[];
  tradeInstructionsLabel: string;
  tradeInstructionsTerms: string;
  tradeInstructionsInstructions: string;
  isDeleted: boolean;
  whenDeleted: DateType;
  createdAt: DateType;
  updatedAt: DateType;
  cryptocurrency?: GetCryptocurrencyReturnType;
  fiat?: GetFiatReturnType;
  vendor?: GetUserReturnType;
  paymentMethod?: GetLanguageReturnType;
};
