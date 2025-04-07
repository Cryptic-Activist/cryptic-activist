import { Attachment } from '@/models/ChatMessage/types';
import { Types } from 'mongoose';

export interface CreateChatMessageParams {
  chatId: string;
  from: string;
  to: string;
  message: string;
  attachment?: Attachment;
}

export type CreateManyChatMessagesParams = CreateChatMessageParams[];

export interface UpdateChatMessageParams {
  where: {
    _id: Types.ObjectId;
  };
  toUpdate: Partial<{
    from: string;
    to: string;
    message: string;
    attachment?: Attachment;
  }>;
}

export interface DeleteChatMessageParams {
  where: {
    _id: Types.ObjectId;
  };
}

export interface GetChatMessageParams {
  where: {
    _id: Types.ObjectId;
  };
  select?: Record<string, unknown>;
}

export interface GetChatMessagesParams {
  where?: {
    chatId: string;
  };
  orderBy?: Record<string, 'asc' | 'desc'>;
}
