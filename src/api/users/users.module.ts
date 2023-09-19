import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/shared/models/user.model';
import { QueueModule } from 'src/shared/queue/queue.module';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [SequelizeModule.forFeature([User]), QueueModule],
  exports: [SequelizeModule, UsersService],
})
export class UsersModule {}
