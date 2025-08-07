import { IO, Socket } from '../types';
import { prisma, redisClient } from '@/services/db';

import ChatMessage from '@/models/ChatMessage';
import { SendMessageParams } from './types';
import { getPresignedUrl } from '@/services/upload';

export default class Message {
  private socket: Socket;
  private io: IO;

  constructor(socket: Socket, io: IO) {
    this.socket = socket;
    this.io = io;
  }

  async sendMessage() {
    this.socket.on(
      'send_message',
      async ({
        content: { from, message, to, attachment },
        chatId,
      }: SendMessageParams) => {
        try {
          const chat = await prisma.chat.findFirst({
            where: {
              id: chatId,
            },
          });

          if (chat?.id) {
            const newMessage = await ChatMessage.create({
              chatId: chat.id,
              from: from,
              message,
              to: to,
              ...(attachment && {
                type: 'attachment',
                attachment: {
                  key: attachment.key,
                  size: attachment.size,
                  name: attachment.fileName,
                  mimeType: attachment.mimeType,
                  submittedAt: new Date(),
                },
              }),
            });

            // Check if recipient is online via Redis
            const recipientSocketId = await redisClient.hGet(
              'onlineTradingUsers',
              to,
            );
            const senderSocketId = await redisClient.hGet(
              'onlineTradingUsers',
              from,
            );

            let presignedAttachmentUrl;

            if (attachment) {
              presignedAttachmentUrl = await getPresignedUrl(attachment.key);
            }

            if (recipientSocketId) {
              // Deliver message in real time
              this.io.to(chatId).emit('receive_message', {
                from,
                to,
                createdAt: newMessage.createdAt,
                message,
                ...(attachment && {
                  type: newMessage.type,
                  attachment: {
                    ...newMessage.attachment,
                    key: presignedAttachmentUrl.url,
                  },
                }),
              });
            }
          }
        } catch (error) {
          // Check if recipient is online via Redis
          const recipientSocketId = await redisClient.hGet(
            'onlineTradingUsers',
            to,
          );
          if (recipientSocketId) {
            // Deliver message in real time
            this.socket.to(chatId).emit('receive_message_error', {
              error: 'Unable to send message',
            });
          }
        }
      },
    );
  }
}
