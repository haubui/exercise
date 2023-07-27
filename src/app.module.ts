import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConfig } from './database/sequalize.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import * as Joi from 'joi';
import { defaultTypeOrmOptions } from './database/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { jwtModuleOptions } from './config/jwtconfig';
import { AppIntercepter } from './base/app.intercepter';
import { CarRentalValidationPine } from './validate/validation.pine';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/role.guard';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './background/bacground.tasks.module';
import { CACHE_TIME_TO_LIVE, MAX_CACHE_ITEMS } from './constants/constants';
import { CacheService } from './cache/cache.service';
import { BullModule } from '@nestjs/bull';
import { QueueModule } from './queue/queue.module';
const logger = new Logger('SystemLog');

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().default(3000),
      }),
    }),
    TypeOrmModule.forRoot({
      ...defaultTypeOrmOptions,
      entities: [],
    }),
    SequelizeModule.forRoot({
      ...databaseConfig,
      autoLoadModels: true,
      synchronize: true,
    }),
    JwtModule.register({
      ...jwtModuleOptions,
    }),
    AuthModule,
    UsersModule,
    // we are using Caching Version 5.x so time-to-live(ttl) this value counted in miliseconds
    CacheModule.register({
      ttl: CACHE_TIME_TO_LIVE,
      max: MAX_CACHE_ITEMS,
    }),
    ScheduleModule.forRoot(),
    TasksModule,
    QueueModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AppIntercepter,
    },
    {
      provide: APP_PIPE,
      useClass: CarRentalValidationPine,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    CacheService,
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {
    // get an environment variable
    const dbUser = this.configService.get<string>('REDIS_HOST');
    const jwt = this.configService.get<string>('JWT_SECRET');
    const jwt2 = process.env.JWT_SECRET;
    logger.debug(
      'this is db User name ',
      dbUser,
      process.env.NODE_ENV,
      jwt,
      jwt2,
    );
  }
}
