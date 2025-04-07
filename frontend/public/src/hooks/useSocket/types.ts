export type UseSocketParams = {
  roomId?: string;
  user?: User;
};

type User = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
};

export type Message = {
  from: User;
  to: User;
  message: string;
  timestamp: string;
  attachment?: Attachment;
};

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
