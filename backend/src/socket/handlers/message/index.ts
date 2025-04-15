import { IO, Socket } from '../types';
import { createChatMessage, getChat, redisClient } from 'base-ca';

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
      async ({ content: { from, message, to }, chatId }: SendMessageParams) => {
        const chat = await getChat({
          where: {
            id: chatId,
          },
        });

        if (chat?.id) {
          const newMessage = await createChatMessage({
            chatId: chat.id,
            from: from,
            message,
            to: to,
          });

          // Check if recipient is online via Redis
          const recipientSocketId = await redisClient.hGet(
            'onlineTradingUsers',
            to,
          );
          if (recipientSocketId) {
            // Deliver message in real time
            this.io.to(recipientSocketId).emit('receive_message', {
              from,
              to,
              createdAt: newMessage.createdAt,
              message,
            });
          }
        }
      },
    );
  }
}
