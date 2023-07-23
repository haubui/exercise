import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
const logger = new Logger('SystemLog');
import * as uuid from 'uuid';
import { Sequelize } from 'sequelize';
import { JwtService } from '@nestjs/jwt';
async function bootstrap() {
  logger.debug('bootstrap start running....');
  const secretKey = uuid.v4();
  const app = await NestFactory.create(AppModule);
  logger.debug('secretKeyStart');
  logger.debug(process.env.JWT_SECRET);
  logger.debug('secretKeyEnd');
  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
    },
  );
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  await app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST);
}
bootstrap();
