export type User = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
};

export type UserInfo = {
  id: string;
  user: User;
  roomId?: string;
};

export interface Attachment {
  type: string;
  name: string;
  key: string;
  url: string;
}

export type MessageContent = {
  id: string;
  from: string;
  to: string;
  message: string;
  attachment?: Attachment;
  timestamp: string;
};

export type SendMessageParams = {
  roomId: string;
  content: MessageContent;
};

export type SetTradeAs = {
  roomId: string;
  from: string;
  to: string;
};

export type SetTradeAsPaidParams = SetTradeAs;

export type SetTradeAsCanceledParams = SetTradeAs;

export type NotificationTradeStartSentParams = {
  tradeId: string;
};
