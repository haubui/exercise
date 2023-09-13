import { Test, TestingModule } from '@nestjs/testing';
import { CarStatusesController } from './car_statuses.controller';
import { CarStatusesService } from './car_statuses.service';

describe('CarStatusesController', () => {
  let controller: CarStatusesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarStatusesController],
      providers: [CarStatusesService],
    }).compile();

    controller = module.get<CarStatusesController>(CarStatusesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
