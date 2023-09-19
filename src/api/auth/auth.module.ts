import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/api/users/users.service';
import { UsersModule } from 'src/api/users/users.module';
import { JwtService } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Auths } from 'src/shared/models/auth.model';
import { CacheModule } from '@nestjs/cache-manager';
import { QueueModule } from 'src/shared/queue/queue.module';
import {
  CACHE_TIME_TO_LIVE,
  MAX_CACHE_ITEMS,
} from 'src/shared/constants/constants';
import { CacheService } from 'src/shared/cache/cache.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtService, CacheService],
  imports: [
    UsersModule,
    SequelizeModule.forFeature([Auths]),
    CacheModule.register({
      ttl: CACHE_TIME_TO_LIVE,
      max: MAX_CACHE_ITEMS,
    }),
    QueueModule,
  ],
  exports: [AuthService],
})
export class AuthModule {}
