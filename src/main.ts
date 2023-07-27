import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
const logger = new Logger('SystemLog');
import * as UUID from 'uuid';

async function bootstrap() {
  logger.debug('bootstrap start running....');
  const app = await NestFactory.create(AppModule);
  console.log('ADMIN_ID', UUID.v4());
  console.log('USER_ID', UUID.v4());
  await app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST);
}
bootstrap();
