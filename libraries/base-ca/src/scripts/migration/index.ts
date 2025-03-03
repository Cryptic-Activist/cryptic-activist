import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

const parseJSON = () => {
  const p = path.join(__dirname, 'data.json');
  const raw = fs.readFileSync(p);

  // @ts-ignore
  const data = JSON.parse(raw) as string[];
  return data;
};

export const runCreateMigrations = () => {
  const migrationData = parseJSON();

  migrationData.forEach((migration) => {
    exec(
      `yarn sequelize migration:create --name=${migration}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`error: ${error.message}`);
          return;
        }

        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return;
        }

        console.log(`stdout:\n${stdout}`);
      }
    );
  });
};

export const runMigrations = () => {
  exec('yarn sequelize db:migrate', (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }

    console.log(`stdout:\n${stdout}`);
  });
};
