// lib/socket.ts
import { Socket, io } from 'socket.io-client';

import { BACKEND } from '@/constants';

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io(BACKEND, {
      transports: ['websocket'],
      autoConnect: false,
    });

    // socket.on('connect', () => {
    //   console.log('Socket connected:', socket?.id);
    // });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
  }

  return socket;
};
