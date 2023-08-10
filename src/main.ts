import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
const logger = new Logger('SystemLog');
import * as UUID from 'uuid';
import * as multer from 'multer';
import * as path from 'path';

async function bootstrap() {
  logger.debug('bootstrap start running....');
  const app = await NestFactory.create(AppModule);
  console.log('ORDER_STATUS_PENDING', UUID.v4());
  console.log('ORDER_STATUS_DONE', UUID.v4());
  console.log('ORDER_STATUS_CANCELLED', UUID.v4());
  console.log('PAYMENT_STATUS_COD', UUID.v4());
  console.log('PAYMENT_STATUS_CreditCard', UUID.v4());
  console.log('PAYMENT_STATUS_PayPal', UUID.v4());
  console.log('PAYMENT_STATUS_Bitcoin', UUID.v4());
  await app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST);
}
bootstrap();
