export interface Attachment {
  size: number;
  fileName: string;
  key: string;
  mimeType: string;
}

export type MessageContent = {
  id: string;
  from: string;
  to: string;
  message: string;
  attachment?: Attachment | null;
  timestamp: string;
};

export type SendMessageParams = {
  chatId: string;
  content: MessageContent;
};
