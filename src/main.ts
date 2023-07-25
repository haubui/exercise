import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
const logger = new Logger('SystemLog');

async function bootstrap() {
  logger.debug('bootstrap start running....');
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST);
}
bootstrap();
