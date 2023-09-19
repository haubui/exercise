import { Test, TestingModule } from '@nestjs/testing';
import { RecentCarsService } from './recent_cars.service';

describe('RecentCarsService', () => {
  let service: RecentCarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecentCarsService],
    }).compile();

    service = module.get<RecentCarsService>(RecentCarsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
