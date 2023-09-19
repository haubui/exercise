import { Test, TestingModule } from '@nestjs/testing';
import { CarPricesService } from './car_prices.service';

describe('CarPricesService', () => {
  let service: CarPricesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarPricesService],
    }).compile();

    service = module.get<CarPricesService>(CarPricesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
