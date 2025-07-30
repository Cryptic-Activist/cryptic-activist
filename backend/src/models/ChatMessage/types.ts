import { Document } from 'mongoose';

export interface Attachment {
  name: string;
  key: string;
  size: number;
  mimeType: string;
  submittedAt: Date;
  deletedAt: Date;
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
