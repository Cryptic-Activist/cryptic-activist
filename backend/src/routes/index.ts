import { Application } from 'express';
import altcha from './altcha';
import blockchains from './blockchains';
import chats from './chats';
import cryptocurrencies from './cryptocurrencies';
import fiats from './fiats';
import offers from './offers';
import systemMessages from './systemMessages';
import trades from './trades';
import users from './users';

export default (app: Application): void => {
  app.use('/chats', chats);
  app.use('/cryptocurrencies', cryptocurrencies);
  app.use('/fiats', fiats);
  app.use('/offers', offers);
  app.use('/trades', trades);
  app.use('/users', users);
  app.use('/system-messages', systemMessages);
  app.use('/blockchains', blockchains);
  app.use('/altcha', altcha);
};
