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
import { AuthModule } from './api/auth/auth.module';
import { UsersModule } from './api/users/users.module';
import { jwtModuleOptions } from './shared/config/jwtconfig';
import { AppIntercepter } from './shared/base/app.intercepter';
import { AuthGuard } from './shared/guards/auth.guard';
import { RolesGuard } from './shared/guards/role.guard';
import { CacheModule } from '@nestjs/cache-manager';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './shared/background/bacground.tasks.module';
import { QueueModule } from './shared/queue/queue.module';
import { ReviewsModule } from './api/reviews/reviews.module';
import { OrderStatusModule } from './api/order_status/order_status.module';
import { CarPricesModule } from './api/car_prices/car_prices.module';
import { CarStatusesModule } from './api/car_statuses/car_statuses.module';
import { CarsModule } from './api/cars/cars.module';
import { CitiesModule } from './api/cities/cities.module';
import { OrdersModule } from './api/orders/orders.module';
import { PaymentMethodModule } from './api/payment_method/payment_method.module';
import { RecentCarsModule } from './api/recent_cars/recent_cars.module';
import { CacheService } from './shared/cache/cache.service';
import {
  CACHE_TIME_TO_LIVE,
  MAX_CACHE_ITEMS,
} from './shared/constants/constants';
import { CarRentalValidationPine } from './shared/validate/validation.pine';
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
    CarsModule,
    OrdersModule,
    ReviewsModule,
    RecentCarsModule,
    PaymentMethodModule,
    OrderStatusModule,
    CarStatusesModule,
    CarPricesModule,
    CitiesModule,
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
