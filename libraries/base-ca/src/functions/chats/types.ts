import { GetTradeReturnType } from '@/functions/trades/types';
import { DateType } from '@/functions/types';

export type CreateChatParamsType = {
  tradeId: string;
};

export type ChatDynamicType = {
  id?: string;
  isDeleted?: boolean;
  whenDeleted?: null | DateType;
  createdAt?: DateType;
  updatedAt?: DateType;
};

export type UpdateChatWhereType = ChatDynamicType;

export type UpdateChatToUpdateType = ChatDynamicType;

export type DeleteChatWhereType = ChatDynamicType;

export type GetChatWhereType = ChatDynamicType;

export type GetChatReturnType = {
  id: string;
  isDeleted: boolean;
  whenDeleted: DateType;
  createdAt: DateType;
  updatedAt: DateType;
  trade?: GetTradeReturnType;
};
