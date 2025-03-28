import chalk from 'chalk';

export const success = (succesLog: string): void =>
  console.log(`[${chalk.green('OK')}] > ${succesLog}`);

export const error = (err: Error): void => {
  const errorLog = {
    name: err.name,
    message: err.message,
    stack: err.stack,
  };
  console.log(`[${chalk.red('ERROR')}] > ${errorLog}`);
};

export const warning = (warningLog: string): void =>
  console.log(`[${chalk.hex('#ff9900').italic('WARNING')}] > ${warningLog}`);
