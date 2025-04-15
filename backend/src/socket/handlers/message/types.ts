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
  chatId: string;
  content: MessageContent;
};
