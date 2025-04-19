import { DefaultEventsMap, Server, Socket as SocketIO } from 'socket.io';

export type Socket = SocketIO;
export type IO = Server<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  any
>;
export type WalletAddress = `0x${string}`;
export type SetTradeAs = {
  chatId: string;
  from: string;
  to: string;
};
