// socketInstance.ts

import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { Server } from 'socket.io';

let io: Server<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  any
> | null = null;

export const setIO = (
  ioInstance: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
) => {
  io = ioInstance;
};

export const getIO = () => {
  if (!io) {
    throw new Error(
      'Socket.IO not initialized. Did you forget to call setIO()?',
    );
  }
  return io;
};
