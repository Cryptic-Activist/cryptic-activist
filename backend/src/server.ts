import { APP_NAME, NODE_ENV, PORT } from './constants/env';

import app from './app';
import chalk from 'chalk';
import { success } from 'cryptic-utils';

const port = PORT || 5000;

app.listen(port, () => {
  success(`${APP_NAME} is listening on port: ${chalk.green(port)}`);
  success(`NODE_ENV=${NODE_ENV}`);
});
