import { Test, TestingModule } from '@nestjs/testing';
import { RecentCarsController } from './recent_cars.controller';
import { RecentCarsService } from './recent_cars.service';

describe('RecentCarsController', () => {
  let controller: RecentCarsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecentCarsController],
      providers: [RecentCarsService],
    }).compile();

    controller = module.get<RecentCarsController>(RecentCarsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
