import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CarStatusesService } from './car_statuses.service';
import { CreateCarStatusDto } from './dto/create-car_status.dto';
import { UpdateCarStatusDto } from './dto/update-car_status.dto';

@Controller('car-statuses')
export class CarStatusesController {
  constructor(private readonly carStatusesService: CarStatusesService) {}

  @Post()
  create(@Body() createCarStatusDto: CreateCarStatusDto) {
    return this.carStatusesService.create(createCarStatusDto);
  }

  @Get()
  findAll() {
    return this.carStatusesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carStatusesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCarStatusDto: UpdateCarStatusDto,
  ) {
    return this.carStatusesService.update(+id, updateCarStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carStatusesService.remove(+id);
  }
}
