import { Document } from 'mongoose';

export interface Attachment {
  type: string;
  name: string;
  key: string;
  url: string;
}

export interface IChatMessage extends Document {
  id: string;
  chatId: string;
  from: string;
  to: string;
  message?: string;
  type?: 'info' | string;
  attachment?: Attachment;
  createdAt: Date;
  updatedAt: Date;
}
