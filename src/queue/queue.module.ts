import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ComsumerRegisterProcessor } from './consumer.register.processor';
import { REGISTER_USER_QUEUE_PROCESSOR } from 'src/constants/constants';
import { EmailModule } from 'src/email/email.module';
import { config } from 'dotenv';

config();

@Module({
  imports: [
    EmailModule,
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
      },
    }),
    BullModule.registerQueue({ name: REGISTER_USER_QUEUE_PROCESSOR }),
  ],
  controllers: [],
  providers: [ComsumerRegisterProcessor],
  exports: [BullModule],
})
export class QueueModule {}
