import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Role, Roles } from 'src/guards/role.decorator';
import { CarResponseDto } from './dto/car-response.dto';
import { PagingCarDto } from './dto/paging-cars.dto';
import { PagingResponse } from './dto/paging-cars-response.dto';
import { Public } from 'src/guards/public.decorator';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.Admin)
  @Post('create')
  async createCar(@Body() createCarDto: CreateCarDto): Promise<CarResponseDto> {
    console.log(createCarDto);
    return this.carsService.createCar(createCarDto);
  }

  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carsService.create(createCarDto);
  }

  @Get('search')
  @Public()
  async findAll(@Query() pagingCarDto: PagingCarDto): Promise<PagingResponse> {
    return await this.carsService.findAll(pagingCarDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(+id, updateCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carsService.remove(+id);
  }
}
