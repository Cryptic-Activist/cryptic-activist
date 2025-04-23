import { APP_NAME, NODE_ENV, PORT } from './constants/env';

import app from './app';
import chalk from 'chalk';

const port = PORT || 5000;

app.listen(port, () => {
  console.log(`${APP_NAME} is listening on port: ${chalk.green(port)}`);
  console.log(`NODE_ENV=${NODE_ENV}`);
});
