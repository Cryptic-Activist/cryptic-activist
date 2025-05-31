import { IO, Socket } from '../types';

import SystemMessage from '@/services/systemMessage';
import { TradeStartSentParams } from './types';
import { prisma } from '@/services/db';

export default class Notification {
  private socket: Socket;
  private io: IO;

  constructor(socket: Socket, io: IO) {
    this.socket = socket;
    this.io = io;
  }

  tradeStartSent() {
    this.socket.on(
      'notification_trade_start_sent',
      async ({ tradeId }: TradeStartSentParams) => {
        console.log('system message sent');
        const systemMessage = new SystemMessage();
        systemMessage.tradeStarted(tradeId);
      },
    );
  }
}
