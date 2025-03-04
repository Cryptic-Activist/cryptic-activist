import { Application } from 'express';
import chat from './chat';
import systemMessages from './systemMessages';

export default (app: Application) => {
  return {
    init: () => {
      app.use('/systemMessages', systemMessages);
      app.use('/chat', chat);
    },
  };
};
