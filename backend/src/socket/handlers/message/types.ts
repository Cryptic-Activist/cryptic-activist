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
  file?: Attachment | null;
  timestamp: string;
};

export type SendMessageParams = {
  chatId: string;
  content: MessageContent;
};
