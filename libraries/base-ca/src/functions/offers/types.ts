import { DateType } from '@/functions/types';
import { DefaultArgs } from '@prisma/client/runtime';
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

export type UpdateOfferToUpdateType = OfferDynamicType;

export type OfferAssociationsArrayType = {
  vendor?: boolean;
  cryptocurrency?: boolean;
  paymentMethod?: boolean;
  fiat?: boolean;
  feedbacks?: boolean;
  trades?: boolean;
};

export type GetOffersSelect = {
  _count?: boolean | Prisma.OfferCountOutputTypeArgs<DefaultArgs>;
  id?: boolean;
  vendor?: boolean | Prisma.UserArgs<DefaultArgs>;
  cryptocurrency?: boolean | Prisma.CryptocurrencyArgs<DefaultArgs>;
  paymentMethod?: boolean | Prisma.PaymentMethodArgs<DefaultArgs>;
  fiat?: boolean | Prisma.FiatArgs<DefaultArgs>;
  offerType?: boolean;
  pricingType?: boolean;
  listAt?: boolean;
  limitMin?: boolean;
  limitMax?: boolean;
  timeLimit?: boolean;
  tags?: boolean;
  label?: boolean;
  terms?: boolean;
  trades?: boolean | Prisma.Offer$tradesArgs<DefaultArgs>;
  feedbacks?: boolean | Prisma.Offer$feedbacksArgs<DefaultArgs>;
  instructions?: boolean;
  createdAt?: boolean;
  updatedAt?: boolean;
};

export type UpdateOfferParams = {
  toUpdate: UpdateOfferToUpdateType;
  where: Prisma.OfferWhereUniqueInput;
};

export type DeleteOfferParams = {
  where: Prisma.OfferWhereUniqueInput;
};

export type GetOfferParams = {
  where: Prisma.OfferWhereInput;
  associations: OfferAssociationsArrayType;
};

export type GetOffersParams = {
  associations?: OfferAssociationsArrayType;
  where?: Prisma.OfferWhereInput;
  limit?: number;
  select?: Prisma.OfferSelect;
};

export type GetOffersPaginationParams = {
  limit: number;
  offset: number;
  associations?: OfferAssociationsArrayType;
  where?: Prisma.OfferWhereInput;
  select?: Prisma.OfferSelect;
  cursor?: Prisma.OfferWhereUniqueInput;
};
