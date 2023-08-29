import { Sequelize } from 'sequelize';
import { SequelizeOptions } from 'sequelize-typescript';
// eslint-disable-next-line
require('dotenv').config();
export const databaseConfig: SequelizeOptions = {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [__dirname + '/../**/*.model.ts'], // Path to your Sequelize model files
};

export const sequelizeGloble = new Sequelize({
  ...databaseConfig,
});
