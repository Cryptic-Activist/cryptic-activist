import {
  SetPaymentConfirmedParams,
  SetPaymentDisputedParams,
  SetTradeCancelledParams,
} from '../useTrade/types';

import { BlockchainSetter } from '@/store/blockchain/types';
import { TradeSetter } from '@/store/trade/types';

type Status = 'online' | 'offline';

export type UseSocketParams = {
  chatId?: string;
  user?: User;
  timeLimit?: number;
  tradePaid?: string;
  trade: TradeSetter;
  walletAddress?: string;
  blockchain?: BlockchainSetter;
  onStatusChange?: (status: Status) => void;
  onSetPaid: (paidAt: string) => void;
  onSetTradeCreated: () => void;
  onSetCanceled: (params: SetTradeCancelledParams) => void;
  onSetPaymentConfirmed: (params: SetPaymentConfirmedParams) => void;
  onSetDisputed: (params: SetPaymentDisputedParams) => void;
  onSetUpdateVendorWalletAddress?: (walletAddress: string) => void;
  refetchTrade: any;
};

type User = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
};

export type Message = {
  from: string;
  to: string;
  type?: string;
  message: string;
  attachment?: Attachment;
  createdAt: string;
};

export type Messages = Message[];

export interface Attachment {
  type: string;
  name: string;
  key: string;
  url: string;
}

export type MessageContent = {
  from: string;
  to: string;
  message: string;
  attachment?: Attachment;
};

export type SendMessageParams = {
  content: Message;
};

export type ReceiverStatus = 'online' | 'offline';

export type SetAsParams = {
  from?: string;
  to?: string;
};

export type SetAsPaidParams = SetAsParams;

export type SetAsCanceledParams = SetAsParams;

export type SetAsDisputedParams = SetAsParams & {
  chatId: string;
  disputeReason: string;
};
