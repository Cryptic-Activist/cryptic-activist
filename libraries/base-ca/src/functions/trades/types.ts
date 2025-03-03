import { DateType } from '@/functions/types';
import { GetUserReturnType } from '@/functions/users/types';
import { Prisma } from '@prisma/client';

import { GetCryptocurrencyReturnType } from '../cryptocurrencies/types';
import { GetFiatReturnType } from '../fiats/types';
import { GetLanguageReturnType } from '../languages/types';

export type CreateStatePrismaType = Prisma.StringNullableListFilter;
export type UpdateTradeInstructionsTagsPrismaType =
  Prisma.StringFieldUpdateOperationsInput;
export type GetTradeInstructionsTagsPrismaType =
  Prisma.StringNullableListFilter;

export type CreateTradeParams = {
  paymentReceiptId: string;
  vendorId: string;
  traderId: string;
  offerId: string;
  cryptocurrencyId: string;
  fiatId: string;
  chatId?: string;
  cryptocurrencyAmount: number;
  fiatAmount: number;
  startedAt: Date;
  endedAt?: Date;
};

export type WhereTradeParams = {
  id?: string;
  paymentReceiptId?: string;
  vendorId?: string;
  traderId?: string;
  offerId?: string;
  cryptocurrencyId?: string;
  fiatId?: string;
  chatId?: string;
  cryptocurrencyAmount?: number;
  fiatAmount?: number;
  startedAt?: Date;
  endedAt?: Date;
  state?: 'ongoing' | 'canceled' | 'done' | 'error';
  paid?: false;
  isDeleted?: boolean;
  whenDeleted?: DateType;
  createdAt?: DateType;
  updatedAt?: DateType;
};

export type TradeDynamicType = WhereTradeParams;

export type UpdateTradeWhereType = TradeDynamicType;

export type UpdateTradeToUpdateType = TradeDynamicType;

export type DeleteTradeWhereType = TradeDynamicType;

export type GetTradeWhereType = TradeDynamicType;

export type TradeAssociationsArrayType = {
  vendor: boolean;
  trader: boolean;
  offer: boolean;
  cryptocurrency: boolean;
  fiat: boolean;
  chat: boolean;
};

export type GetTradeReturnType = {
  id: string;
  vendorId: string;
  cryptocurrencyId: string;
  paymentMethodId: string;
  fiatId: string;
  paymentMethodType: 'buy' | 'sell';
  tradePricingType: 'market' | 'fixed';
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
