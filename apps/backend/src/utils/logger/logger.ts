import { IS_DEVELOPMENT } from '@/constants';
import chalk from 'chalk';

export const success = (succesLog: string): void =>
  console.log(`[${chalk.green('OK')}] > ${succesLog}`);

export const error = (errorLog: string): void =>
  console.log(`[${chalk.red('ERROR')}] > ${errorLog}`);

export const warning = (warningLog: string): void =>
  console.log(`[${chalk.hex('#ff9900').italic('WARNING')}] > ${warningLog}`);

export const debug = (log: any) => {
  if (IS_DEVELOPMENT) {
    console.log(log);
  }
};
