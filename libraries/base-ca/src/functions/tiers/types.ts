import { DateType } from '@/functions/types';
import { DefaultArgs } from '@prisma/client/runtime';
import { Prisma } from '@prisma/client';

export type UpdateTagsPrismaType =
  Prisma.StringFieldUpdateOperationsInput;
export type GetTradeInstructionsTagsPrismaType =
  Prisma.StringNullableListFilter;

export type CreateTierParams = {
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

export type TierDynamicType = {
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

export type UpdateTierToUpdateType = TierDynamicType;

export type TierAssociationsArrayType = {
  vendor?: boolean;
  cryptocurrency?: boolean;
  paymentMethod?: boolean;
  fiat?: boolean;
  feedbacks?: boolean;
  trades?: boolean;
};

export type GetTiersSelect = {
  _count?: boolean | Prisma.TierCountOutputTypeArgs<DefaultArgs>;
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
  trades?: boolean | Prisma.Tier$usersArgs<DefaultArgs>;
  feedbacks?: boolean | Prisma.Tier$feedbacksArgs<DefaultArgs>;
  instructions?: boolean;
  createdAt?: boolean;
  updatedAt?: boolean;
};

export type UpdateTierParams = {
  toUpdate: UpdateTierToUpdateType;
  where: Prisma.TierWhereUniqueInput;
};

export type DeleteTierParams = {
  where: Prisma.TierWhereUniqueInput;
};

export type GetTierParams = {
  associations?: TierAssociationsArrayType;
  where?: Prisma.TierWhereInput;
  select?: Prisma.TierSelect;
};

export type GetTiersParams = {
  associations?: TierAssociationsArrayType;
  where?: Prisma.TierWhereInput;
  limit?: number;
  select?: Prisma.TierSelect;
};

export type GetTiersPaginationParams = {
  limit: number;
  offset?: number;
  cursor?: Prisma.TierWhereUniqueInput & { id: string };
  associations?: TierAssociationsArrayType;
  where?: Prisma.TierWhereInput;
  select?: Prisma.TierSelect;
  orderBy?: Prisma.TierOrderByWithAggregationInput;
};
