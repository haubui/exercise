import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { JwtService } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Auths } from 'src/models/auth.model';
import { CacheService } from 'src/cache/cache.service';
import { CacheModule } from '@nestjs/cache-manager';
import { CACHE_TIME_TO_LIVE, MAX_CACHE_ITEMS } from 'src/constants/constants';
import { QueueModule } from 'src/queue/queue.module';

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
