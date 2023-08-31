import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RecentCarsService } from './recent_cars.service';
import { CreateRecentCarDto } from './dto/create-recent_car.dto';
import { UpdateRecentCarDto } from './dto/update-recent_car.dto';

@Controller('recent-cars')
export class RecentCarsController {
  constructor(private readonly recentCarsService: RecentCarsService) {}

  @Post()
  create(@Body() createRecentCarDto: CreateRecentCarDto) {
    return this.recentCarsService.create(createRecentCarDto);
  }

  @Get(':user_id')
  findAllRecentCar(@Param('user_id') user_id: string) {
    return this.recentCarsService.findAllRecentCarByUser(user_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recentCarsService.findOneRecentCar(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRecentCarDto: UpdateRecentCarDto,
  ) {
    return this.recentCarsService.update(+id, updateRecentCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recentCarsService.remove(+id);
  }
}
