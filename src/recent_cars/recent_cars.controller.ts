import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { RecentCarsService } from './recent_cars.service';
import { CreateRecentCarDto } from './dto/create-recent_car.dto';
import { UpdateRecentCarDto } from './dto/update-recent_car.dto';

@Controller('v1/recent-cars')
export class RecentCarsController {
  constructor(private readonly recentCarsService: RecentCarsService) {}

  @Post()
  create(@Body() createRecentCarDto: CreateRecentCarDto) {
    return this.recentCarsService.create(createRecentCarDto);
  }

  @Get()
  findAllRecentCar(@Req() request: any) {
    console.log(`request.user.user_id ${request.user.user_id}`);
    return this.recentCarsService.findAllRecentCarByUser(request.user.user_id);
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
