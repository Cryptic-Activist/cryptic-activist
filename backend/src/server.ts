import chalk from 'chalk';
import { checkEnvironmentVariable, success } from 'cryptic-utils';

import app from './app';
import { APP_NAME, NODE_ENV, PORT } from './constants/env';

// import requiredEnv from 'envs.json';

// checkEnvironmentVariable(requiredEnv);

const port = PORT || 5005;

app.listen(port, () => {
  success(`${APP_NAME} is listening on port: ${chalk.green(port)}`);
  success(`NODE_ENV=${NODE_ENV}`);
});
