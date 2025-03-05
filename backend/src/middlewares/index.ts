import cors from 'cors';
import { Application, json, urlencoded } from 'express';
import morgan from 'morgan';

import corsOptions from '../config/middleware/cors';

export default (app: Application): void => {
  app.use(cors(corsOptions));

  app.use(json({ limit: '5mb' }));

  app.use(
    urlencoded({
      extended: false,
    }),
  );

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }
};
