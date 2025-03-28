import { Application, json, urlencoded } from 'express';

import cors from 'cors';
import corsOptions from '@/config/middleware/cors';
import morgan from 'morgan';

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
