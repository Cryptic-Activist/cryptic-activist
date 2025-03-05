import { exit } from 'process';
import { warning } from '../logger';

const checkEnv = (envName: string) => {
  if (!process.env[envName]) {
    warning(`${envName} environment variable is missing`);
    exit(1);
  }
};

export const checkEnvironmentVariable = (requiredEnvArr: string[]) => {
  requiredEnvArr.forEach((envName) => {
    checkEnv(envName);
  });
};
