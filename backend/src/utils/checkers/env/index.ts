import { exit } from 'process';
import requiredEnv from '../../../../../api-fiat-cryptic-activist/envs.json';
import { warning } from '../../../../../api-fiat-cryptic-activist/src/utils/logger/logger';

function checkEnv(envName: string): void {
  if (!process.env[envName]) {
    warning(`${envName} environment variable is missing`);
    exit(1);
  }
}

export function checkEnvironmentVariable(): void {
  requiredEnv.forEach((envName) => {
    checkEnv(envName);
  });
}
