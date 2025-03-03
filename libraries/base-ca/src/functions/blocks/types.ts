import { DateType } from '@/functions/types';

export type CreateBlockParamsType = {
  blockerId: string;
  blockedId: string;
};

export type BlockDynamicType = {
  id?: string;
  blockerId?: string;
  blockedId?: string;
  isDeleted?: boolean;
  whenDeleted?: null | DateType;
  createdAt?: DateType;
  updatedAt?: DateType;
};

export type UpdateBlockWhereType = BlockDynamicType;

export type UpdateBlockToUpdateType = BlockDynamicType;

export type DeleteBlockWhereType = BlockDynamicType;

export type GetBlockWhereType = BlockDynamicType;

export type BlockAssociationsType = {
  blocked: boolean;
  blocker: boolean;
};

export type GetBlockReturnType = {
  id: string;
  blockerId: string;
  blockedId: string;
  isDeleted: boolean;
  whenDeleted: DateType;
  createdAt: DateType;
  updatedAt: DateType;
};
