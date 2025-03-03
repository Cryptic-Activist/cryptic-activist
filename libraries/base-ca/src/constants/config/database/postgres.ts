const {
  DB_NAME: name,
  DB_USERNAME: username,
  DB_PASSWORD: password,
  DB_HOST: host,
} = process.env;

const DB_NAME: string = name as string;
const DB_USERNAME: string = username as string;
const DB_PASSWORD: string = password as string;
const DB_HOST: string = host as string;

export { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST };
