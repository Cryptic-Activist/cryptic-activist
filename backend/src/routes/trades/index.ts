import { Application } from 'express';
import trade from './trade';
import trades from './trades';

export default (app: Application) => {
  return {
    init: () => {
      app.use('/trade', trade);
      app.use('/trades', trades);
    },
  };
};
