import { Test, TestingModule } from '@nestjs/testing';
import { CarPricesController } from './car_prices.controller';
import { CarPricesService } from './car_prices.service';

describe('CarPricesController', () => {
  let controller: CarPricesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarPricesController],
      providers: [CarPricesService],
    }).compile();

    controller = module.get<CarPricesController>(CarPricesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
