import { Application } from 'express';
import chats from './chats';
import cryptocurrencies from './cryptocurrencies';
import fiats from './fiats';
import offers from './offers';
import trades from './trades';
import users from './users';

export default (app: Application): void => {
  users(app).init();
  trades(app).init();
  offers(app).init();
  fiats(app).init();
  cryptocurrencies(app).init();
  chats(app).init();
};
