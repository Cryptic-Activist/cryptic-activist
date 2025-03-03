import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export const setupEnvironment = () => {
  const envMain = [];
  const envMainPort = [];

  const rootRepoFolder = path
    .dirname(__dirname)
    .split(path.sep)
    .slice(0, 6)
    .join('/');

  const repos = fs
    .readdirSync(rootRepoFolder)
    .filter(
      (file) =>
        file.includes('api') || file.includes('cryptic-activist-catalog'),
    );

  let port = 5000;

  let userApiIndex = 0;

  repos.forEach((repo, index) => {
    if (repo.toLowerCase().includes('user')) {
      userApiIndex = index;
    }
  });

  repos.forEach((repo, index) => {
    if (index < repos.length - 1) {
      const appName = `${repo.split('-')[1][0].toUpperCase()}${repo
        .split('-')[1]
        .substring(1, repo.split('-')[1].length)}`;

      const appSessionhaSecret = crypto.randomBytes(32).toString('hex');
      const jwtSecret1 = crypto.randomBytes(32).toString('hex');
      const jwtSecret2 = crypto.randomBytes(32).toString('hex');

      const appNameEnv = [appName.toUpperCase(), '_API'].join('');
      // @ts-ignore
      envMain.push(appNameEnv);
      // @ts-ignore
      envMainPort.push(port);

      if (appName.toLowerCase() === 'user') {
        // @ts-ignore
        userApi = port;
      }

      const fileContent = `NODE_ENV=development

APP_NAME=Cryptic Activist ${appName} API

CRYPTIC_ACTIVIST_CATALOG=http://localhost:3000

APP_SESSION_SECRET=${appSessionhaSecret}

SEQUELIZE_DATABASE=cryptic-activist
SEQUELIZE_USERNAME=postgres
SEQUELIZE_PASSWORD=postgres
SEQUELIZE_HOST=localhost

JWT_SECRET=${jwtSecret1}
JWT_REFRESH_SECRET=${jwtSecret2}

USER_API=http://localhost:500${userApiIndex}

PORT=${port}

MONGODB_URI=mongodb+srv://activist:<password>@cryptic-activist-catalo.zwo6a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
`;
      fs.writeFileSync(`${rootRepoFolder}/../${repo}/.env`, fileContent);

      const envsContent = `[
  "NODE_ENV",
  "APP_NAME",
  "CRYPTIC_ACTIVIST_CATALOG",
  "JWT_SECRET",
  "JWT_REFRESH_SECRET",
  "APP_SESSION_SECRET",
  "SEQUELIZE_DATABASE",
  "SEQUELIZE_USERNAME",
  "SEQUELIZE_PASSWORD",
  "SEQUELIZE_HOST" 
]`;

      fs.writeFileSync(`${rootRepoFolder}/../${repo}/envs.json`, envsContent);

      // eslint-disable-next-line no-plusplus
      port++;
    }
  });

  let envMainContent = 'MAIN_DOMAIN=http://localhost:3000\n';

  envMain.forEach((env, index) => {
    envMainContent += `${env}=http://localhost:${envMainPort[index]}\n`;
  });

  fs.writeFileSync(
    `${rootRepoFolder}/new-cryptic-activist-catalog/.env`,
    envMainContent.trim(),
  );
};
