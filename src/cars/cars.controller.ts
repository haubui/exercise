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
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Role, Roles } from 'src/guards/role.decorator';
import { CarResponseDto } from './dto/car-response.dto';
import { PagingCarDto } from './dto/paging-cars.dto';
import { PagingResponse } from './dto/paging-cars-response.dto';
import { Public } from 'src/guards/public.decorator';
import { CarDetailDto } from './dto/detail-car-queries.dto';
import { MulterFile } from 'multer';
import { CarsFileInterceptor } from './cars.intercepters';

@Controller('v1/cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.Admin)
  @Post('create')
  async createCar(@Body() createCarDto: CreateCarDto): Promise<CarResponseDto> {
    console.log(createCarDto);
    return this.carsService.createCar(createCarDto);
  }

  @Post('upload')
  @UseInterceptors(new CarsFileInterceptor())
  uploadImage(
    @UploadedFile() file: MulterFile,
    @Query('carId') carId: string,
  ): string {
    console.log(file.originalname);
    this.carsService.addCarImageForId(carId, file.path);
    console.log('carId', carId);
    return file.path;
  }

  @Get('search')
  @Public()
  async findAll(@Query() pagingCarDto: PagingCarDto): Promise<PagingResponse> {
    return await this.carsService.findAllAvailableCarForRent(pagingCarDto);
  }

  @Get('detail')
  findOneDetailCar(@Req() request: any, @Query() carDetail: CarDetailDto) {
    return this.carsService.findOneCarDetail(
      request.user.user_id,
      carDetail.car_id,
    );
  }

  @Get('recommendationCars/:carId')
  @Public()
  async findRecommendationCars(
    @Param('carId') carId: string,
  ): Promise<PagingResponse> {
    return await this.carsService.findRecommendationCars(carId);
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
