import { Application, ErrorRequestHandler } from 'express';

export const multerErrorHandler = (app: Application) => {
  const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err.code === 'LIMIT_FILE_SIZE') {
      res.status(413).json({ message: 'File too large. Max size is 2MB.' });
      return;
    }

    res.status(500).json({
      message: 'Internal server error',
      error: err.message || 'Unknown error',
    });
    return;
  };

  app.use(errorHandler);
};
