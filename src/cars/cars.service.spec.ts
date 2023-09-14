import { Test, TestingModule } from '@nestjs/testing';
import { CarsService } from './cars.service';
import { PagingCarDto } from './dto/paging-cars.dto';
import { plainToClass, plainToInstance } from 'class-transformer';
import { PagingResponse } from './dto/paging-cars-response.dto';
import { CarsFileInterceptor } from './cars.intercepters';
import { MulterModule } from '@nestjs/platform-express';
import { SequelizeModule } from '@nestjs/sequelize';
import { CarImages } from './entities/car-image.model';
import { CarSteering } from './entities/car-steering.model';
import { CarType } from './entities/car-type.model';
import { Car } from './entities/car.model';

describe('CarsService', () => {
  let service: CarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MulterModule.register()],
      providers: [CarsService, CarsFileInterceptor],
    }).compile();

    service = module.get<CarsService>(CarsService);
  });

  describe('findAllAvailableCarForRent', () => {
    it('should return a paging response of available cars for rent', async () => {
      // Create a sample PagingCarDto object
      const pagingCarDto = {
        limit: 10,
        offset: 0,
        type_id: [5],
        type_steering_id: [1],
        name: 'Nissan GT - R',
        pick_up_date: '2023-08-15T20:11:53.000Z',
        drop_off_date: '2023-08-16T20:11:53.000Z',
      };

      const dto = plainToInstance(PagingCarDto, pagingCarDto);

      const pagingMocked = {
        success: true,
        status_code: 200,
        data: {
          items: [
            {
              id: 27,
              created_at: null,
              updated_at: null,
              car_type_id: 5,
              car_steering_id: 1,
              name: 'Nissan GT - R',
              car_description:
                'The best Nissan GT - R ever! Model Hatchback and with engine Automatic are awsome! It have capability with 8 people and gasoline size about 194 galon. So cool!',
              capability: 8,
              gasoline: 194,
              average_rate: null,
              amount_reviews: null,
              current_price: 114,
              carType: {
                id: 5,
                created_at: '2023-08-07T23:06:34.000Z',
                updated_at: '2023-08-07T23:06:34.000Z',
                type: 'Coupe',
                amount: 37,
              },
              carSteering: {
                id: 1,
                created_at: '2023-08-07T23:06:34.000Z',
                updated_at: '2023-08-07T23:06:34.000Z',
                steering: 'Manual',
              },
              carPrices: [
                {
                  id: 27,
                  created_at: null,
                  updated_at: null,
                  car_id: 27,
                  price_rent_per_day: 114,
                  discount_start: null,
                  discount_until: null,
                  discount_price: null,
                },
              ],
              carStatuses: [
                {
                  id: 27,
                  created_at: null,
                  updated_at: null,
                  car_id: 27,
                  status: 'AVAILABLE',
                  start_time: '2023-08-07T23:06:34.000Z',
                  end_time: null,
                  pick_up_place: null,
                  drop_off_place: null,
                },
              ],
              carImages: [
                {
                  id: 27,
                  created_at: null,
                  updated_at: null,
                  car_id: 27,
                  url: 'resouces/cars/27.png',
                  order: 27,
                },
              ],
            },
            {
              id: 54,
              created_at: null,
              updated_at: null,
              car_type_id: 5,
              car_steering_id: 1,
              name: 'Nissan GT - R',
              car_description:
                'The best Nissan GT - R ever! Model Hatchback and with engine Automatic are awsome! It have capability with 11 people and gasoline size about 31 galon. So cool!',
              capability: 11,
              gasoline: 31,
              average_rate: null,
              amount_reviews: null,
              current_price: 90,
              carType: {
                id: 5,
                created_at: '2023-08-07T23:06:34.000Z',
                updated_at: '2023-08-07T23:06:34.000Z',
                type: 'Coupe',
                amount: 37,
              },
              carSteering: {
                id: 1,
                created_at: '2023-08-07T23:06:34.000Z',
                updated_at: '2023-08-07T23:06:34.000Z',
                steering: 'Manual',
              },
              carPrices: [
                {
                  id: 54,
                  created_at: null,
                  updated_at: null,
                  car_id: 54,
                  price_rent_per_day: 90,
                  discount_start: null,
                  discount_until: null,
                  discount_price: null,
                },
              ],
              carStatuses: [
                {
                  id: 54,
                  created_at: null,
                  updated_at: null,
                  car_id: 54,
                  status: 'AVAILABLE',
                  start_time: '2023-08-07T23:06:34.000Z',
                  end_time: null,
                  pick_up_place: null,
                  drop_off_place: null,
                },
              ],
              carImages: [
                {
                  id: 54,
                  created_at: null,
                  updated_at: null,
                  car_id: 54,
                  url: 'resouces/cars/54.png',
                  order: 54,
                },
                {
                  id: 205,
                  created_at: '2023-08-10T16:43:05.000Z',
                  updated_at: '2023-08-10T16:43:05.000Z',
                  car_id: 54,
                  url: 'uploads/2cf69332-76f7-4545-a1e3-34d36dc69e82.jpg',
                  order: 5,
                },
                {
                  id: 204,
                  created_at: '2023-08-10T16:41:32.000Z',
                  updated_at: '2023-08-10T16:41:32.000Z',
                  car_id: 54,
                  url: 'uploads/335a3923-7886-4b16-b872-d5b91b86429f.png',
                  order: 4,
                },
                {
                  id: 203,
                  created_at: '2023-08-10T16:41:32.000Z',
                  updated_at: '2023-08-10T16:41:32.000Z',
                  car_id: 54,
                  url: 'uploads/90bd7a99-2bbd-4611-a3c9-38e0a46b8b77.png',
                  order: 3,
                },
                {
                  id: 202,
                  created_at: '2023-08-10T16:41:31.000Z',
                  updated_at: '2023-08-10T16:41:31.000Z',
                  car_id: 54,
                  url: 'uploads/b01edf17-2d7f-4877-82eb-5bcd2ef68496.png',
                  order: 2,
                },
                {
                  id: 201,
                  created_at: '2023-08-10T16:41:29.000Z',
                  updated_at: '2023-08-10T16:41:29.000Z',
                  car_id: 54,
                  url: 'uploads/45b79ffe-539d-4c37-8f85-87f66fca456a.png',
                  order: 1,
                },
              ],
            },
            {
              id: 121,
              created_at: null,
              updated_at: null,
              car_type_id: 5,
              car_steering_id: 1,
              name: 'Nissan GT - R',
              car_description:
                'The best Nissan GT - R ever! Model Hatchback and with engine Automatic are awsome! It have capability with 8 people and gasoline size about 122 galon. So cool!',
              capability: 8,
              gasoline: 122,
              average_rate: null,
              amount_reviews: null,
              current_price: 127,
              carType: {
                id: 5,
                created_at: '2023-08-07T23:06:34.000Z',
                updated_at: '2023-08-07T23:06:34.000Z',
                type: 'Coupe',
                amount: 37,
              },
              carSteering: {
                id: 1,
                created_at: '2023-08-07T23:06:34.000Z',
                updated_at: '2023-08-07T23:06:34.000Z',
                steering: 'Manual',
              },
              carPrices: [
                {
                  id: 121,
                  created_at: null,
                  updated_at: null,
                  car_id: 121,
                  price_rent_per_day: 127,
                  discount_start: null,
                  discount_until: null,
                  discount_price: null,
                },
              ],
              carStatuses: [
                {
                  id: 121,
                  created_at: null,
                  updated_at: null,
                  car_id: 121,
                  status: 'AVAILABLE',
                  start_time: '2023-08-07T23:06:34.000Z',
                  end_time: null,
                  pick_up_place: null,
                  drop_off_place: null,
                },
              ],
              carImages: [
                {
                  id: 121,
                  created_at: null,
                  updated_at: null,
                  car_id: 121,
                  url: 'resouces/cars/121.png',
                  order: 121,
                },
              ],
            },
          ],
          pagination: {
            total: 8,
            offset: 0,
            limit: 10,
          },
        },
      };

      // Mock the necessary data or dependencies
      jest
        .spyOn(service, 'findAllAvailableCarForRent')
        .mockImplementation(() => {
          // In this example, assume that we have an array of available cars

          const pagingReponseMocked = plainToClass(
            PagingResponse,
            pagingMocked,
          );
          return Promise.resolve(pagingReponseMocked);
        });

      // Call the findAllAvailableCarForRent function
      const result = await service.findAllAvailableCarForRent(dto);

      // Assert the expected result
      expect(result).toStrictEqual(pagingMocked);
    });
  });
});
