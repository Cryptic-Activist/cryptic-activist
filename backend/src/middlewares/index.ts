import { Application, json, urlencoded } from 'express';

import cors from 'cors';
import corsOptions from '@/config/middleware/cors';
import morgan from 'morgan';
import { multerErrorHandler } from './multer';

export default (app: Application): void => {
  app.use(cors(corsOptions));

  app.use(json({ limit: '5mb' }));

  app.use(
    urlencoded({
      extended: false,
    }),
  );

  multerErrorHandler(app);

  // if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  // }
};
