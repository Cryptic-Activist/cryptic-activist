import { DateType } from '@/functions/types';

export type CreateTrustParamsType = {
  trusterId: string;
  trustedId: string;
};

export type TrustDynamicType = {
  id?: string;
  trusterId?: string;
  trustedId?: string;
  isDeleted?: boolean;
  whenDeleted?: null | DateType;
  createdAt?: DateType;
  updatedAt?: DateType;
};

export type UpdateTrustWhereType = TrustDynamicType;

export type UpdateTrustToUpdateType = TrustDynamicType;

export type DeleteTrustWhereType = TrustDynamicType;

export type GetTrustWhereType = TrustDynamicType;

export type TrustAssociationsArrayType = {
  truster: boolean;
  trusted: boolean;
};

export type GetTrustReturnType = {
  id: string;
  trusterId: string;
  trustedId: string;
  isDeleted: boolean;
  whenDeleted: DateType;
  createdAt: DateType;
  updatedAt: DateType;
};
