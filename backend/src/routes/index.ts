import { Application, static as static_ } from 'express';

import { IS_DEVELOPMENT } from '@/constants';
import admins from './admins';
import altcha from './altcha';
import banners from './banners';
import blockchains from './blockchains';
import chats from './chats';
import cryptocurrencies from './cryptocurrencies';
import disputes from './disputes';
import feedbacks from './feedbacks';
import fiats from './fiats';
import health from './health';
import offers from './offers';
import path from 'path';
import premium from './premium';
import settings from './settings';
import systemMessages from './systemMessages';
import tiers from './tiers';
import trades from './trades';
import upload from './upload';
import users from './users';
import vendors from './vendors';

export default (app: Application): void => {
  app.use('/admins', admins);
  app.use('/banners', banners);
  app.use('/chats', chats);
  app.use('/cryptocurrencies', cryptocurrencies);
  app.use('/disputes', disputes);
  app.use('/fiats', fiats);
  app.use('/offers', offers);
  app.use('/trades', trades);
  app.use('/users', users);
  app.use('/premium', premium);
  app.use('/system-messages', systemMessages);
  app.use('/feedbacks', feedbacks);
  app.use('/blockchains', blockchains);
  app.use('/altcha', altcha);
  app.use('/vendors', vendors);
  app.use('/tiers', tiers);
  app.use('/health', health);
  app.use('/upload', upload);
  app.use('/settings', settings);

  if (IS_DEVELOPMENT) {
    app.use('/uploads', static_(path.join(__dirname, '../uploads')));
  }
};
