import mongoose, { Schema } from 'mongoose';

import { IChatMessage } from './types';

const AttachmentSchema: Schema = new Schema({
  name: { type: String, required: true },
  key: { type: String, required: true },
  size: { type: Number, required: true },
  mimeType: { type: String, required: true },
  submittedAt: { type: Date, required: false },
  deletedAt: { type: Date, required: false },
});

const ChatMessageSchema: Schema = new Schema(
  {
    chatId: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    type: { type: String, required: false },
    message: { type: String, required: false },
    attachment: { type: AttachmentSchema, required: false },
  },
  { timestamps: true },
);

export default mongoose.model<IChatMessage>('ChatMessage', ChatMessageSchema);
