import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Role, Roles } from 'src/guards/role.decorator';
import { UserPayOrderDto } from './dto/user-pay-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('makeOrder')
  makeOrderByCarId(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Post('makeOrderByCar')
  makeOrderBaseOnCarInfo(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto, true);
  }

  @Post('userPaidAnOrder')
  @Roles(Role.Admin)
  userPaidAnOrder(@Body() userPayOrderDto: UserPayOrderDto) {
    return this.ordersService.update(userPayOrderDto);
  }

  @Post('cancelOrder')
  cancelOrder(@Body() userPayOrderDto: UserPayOrderDto) {
    return this.ordersService.update(userPayOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('findOrder')
  findOrderByUserEmail(@Query('userEmail') userEmail: string) {
    return this.ordersService.findOrderByUserEmail(userEmail);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
