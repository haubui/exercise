import { Test, TestingModule } from '@nestjs/testing';
import { CarStatusesService } from './car_statuses.service';

describe('CarStatusesService', () => {
  let service: CarStatusesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarStatusesService],
    }).compile();

    service = module.get<CarStatusesService>(CarStatusesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
