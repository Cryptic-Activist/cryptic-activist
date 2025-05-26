import { EMAIL_FROM, buildTradeStartedEmail } from '@/services/email';
import { IO, Socket } from '../types';
import { prisma, redisClient } from '@/services/db';

import { FRONTEND_PUBLIC } from '@/constants/env';
import { publishToQueue } from '@/services/rabbitmq';

export default class Timer {
  private socket: Socket;
  private io: IO;

  constructor(socket: Socket, io: IO) {
    this.socket = socket;
    this.io = io;
  }

  update() {
    this.socket.on('timer:update', async ({ remaining, chatId }) => {
      console.log(
        `Timer expired for trade ${chatId} with remaining time ${remaining}`,
      );
      this.io.to(chatId).emit('trade_timer_update', { remaining, chatId });
    });
  }

  expired() {
    this.socket.on('timer:expired', async ({ chatId }) => {
      this.io.to(chatId).emit('trade_timer_expired', { chatId });
    });
  }
}
