type Status = 'online' | 'offline';

export type UseSocketParams = {
  roomId?: string;
  user?: User;
  timeLimit?: number;
  onStatusChange?: (status: Status) => void;
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

export type SetAsPaidParams = {
  from?: string;
  to?: string;
};
