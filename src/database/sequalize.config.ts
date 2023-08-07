import { SequelizeOptions } from 'sequelize-typescript';
import { CarType } from 'src/cars/entities/car-type.model';
import { Car } from 'src/cars/entities/car.model';
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

// CarType.hasMany(Car);
// Car.belongsTo(CarType);
