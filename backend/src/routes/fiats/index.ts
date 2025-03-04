import { Application } from 'express';
import fiat from './fiat';
import fiats from './fiats';

export default (app: Application) => {
  return {
    init: () => {
      app.use('/fiat', fiat);
      app.use('/fiats', fiats);
    },
  };
};
