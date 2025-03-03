import { Sequelize } from 'sequelize';
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_USERNAME,
} from '../../../constants/config/database/postgres';

const sequelize: Sequelize = new Sequelize(
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  {
    host: DB_HOST,
    dialect: 'postgres',
    // logging: (...msg) => console.log(msg),
  }
);

export default sequelize;
