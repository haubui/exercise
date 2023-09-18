import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderStatusService } from './order_status.service';
import { CreateOrderStatusDto } from './dto/create-order_status.dto';
import { UpdateOrderStatusDto } from './dto/update-order_status.dto';
import { Roles, Role } from 'src/guards/role.decorator';

@Controller('v1/order-status')
export class OrderStatusController {
  constructor(private readonly orderStatusService: OrderStatusService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() createOrderStatusDto: CreateOrderStatusDto) {
    return this.orderStatusService.create(createOrderStatusDto);
  }

  @Get()
  findAll() {
    return this.orderStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderStatusService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return this.orderStatusService.update(+id, updateOrderStatusDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.orderStatusService.remove(+id);
  }
}
