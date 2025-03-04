import { Application } from 'express';
import cryptocurrencies from './cryptocurrencies';
import cryptocurrency from './cryptocurrency';

export default (app: Application) => {
  return {
    init: () => {
      app.use('/cryptocurrency', cryptocurrency);
      app.use('/cryptocurrencies', cryptocurrencies);
    },
  };
};
