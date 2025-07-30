import { IO, Socket } from '../types';
import { prisma, redisClient } from '@/services/db';

import ChatMessage from '@/models/ChatMessage';
import { SendMessageParams } from './types';

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
        content: { from, message, to, file },
        chatId,
      }: SendMessageParams) => {
        try {
          console.log({ message, file });

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
              ...(file && {
                type: 'file',
                attachment: {
                  key: file.key,
                  size: file.size,
                  name: file.fileName,
                  mimeType: file.mimeType,
                  submittedAt: new Date(),
                },
              }),
            });

            console.log({ newMessage });

            // Check if recipient is online via Redis
            const recipientSocketId = await redisClient.hGet(
              'onlineTradingUsers',
              to,
            );

            console.log({ recipientSocketId });
            if (recipientSocketId) {
              // Deliver message in real time
              this.socket.to(chatId).emit('receive_message', {
                from,
                to,
                createdAt: newMessage.createdAt,
                message,
                ...(file && {
                  type: newMessage.type,
                  attachment: newMessage.attachment,
                }),
              });
            }
          }
        } catch (error) {
          console.log({ error });
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
