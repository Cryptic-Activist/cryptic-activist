import { warning } from '@utils/logger/logger';

export function checkEnvironmentVariable(): void {
  const missingEnvs: string[] = [];

  if (!process.env.NODE_ENV) {
    missingEnvs.push('NODE_ENV');
  }
  if (!process.env.APP_NAME) {
    missingEnvs.push('APP_NAME');
  }
  if (!process.env.CRYPTIC_ACTIVIST_CATALOG) {
    missingEnvs.push('CRYPTIC_ACTIVIST_CATALOG');
  }
  if (!process.env.JWT_SECRET) {
    missingEnvs.push('JWT_ACCESS_TOKEN_SECRET');
  }
  if (!process.env.JWT_REFRESH_TOKEN_SECRET) {
    missingEnvs.push('JWT_REFRESH_TOKEN_SECRET');
  }
  if (!process.env.APP_SESSION_SECRET) {
    missingEnvs.push('APP_SESSION_SECRET');
  }
  if (!process.env.SEQUELIZE_DATABASE) {
    missingEnvs.push('SEQUELIZE_DATABASE');
  }
  if (!process.env.SEQUELIZE_USERNAME) {
    missingEnvs.push('SEQUELIZE_USERNAME');
  }
  if (!process.env.SEQUELIZE_PASSWORD) {
    missingEnvs.push('SEQUELIZE_PASSWORD');
  }
  if (!process.env.SEQUELIZE_HOST) {
    missingEnvs.push('SEQUELIZE_HOST');
  }

  missingEnvs.forEach((mEnv) => {
    warning(`${mEnv} environment variable is missing`);
  });
}
