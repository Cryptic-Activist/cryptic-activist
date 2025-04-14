import { TradeSetter } from '@/store/trade/types';

type Status = 'online' | 'offline';

export type UseSocketParams = {
  roomId?: string;
  user?: User;
  timeLimit?: number;
  tradePaid?: boolean;
  trade: TradeSetter;
  walletAddress?: string;
  onStatusChange?: (status: Status) => void;
  onSetPaid: (isPaid: boolean) => void;
  onSetCanceled: () => void;
  onSetReceived: (hasReceived: boolean) => void;
  onSetUpdateVendorWalletAddress?: (walletAddress: string) => void;
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
