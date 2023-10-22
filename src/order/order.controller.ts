import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from 'src/dto/order.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Get()
  async findAll(@Req() req) {
    const userId = req.user.sub
    return await this.orderService.findAll(userId)
  }

  @Get('find/:id')
  async findOne(@Param('id') orderId: string) {
    return await this.orderService.findOne(orderId)
  }

  @Post('place-order')
  async create(@Req() req, @Body() dto: OrderDto) {
    const userId = req.user.sub
    return await this.orderService.create(userId, dto)
  }

  @Delete('delete/:id')
  async delete(@Param('id') orderId: string) {
    return await this.orderService.delete(orderId)
  }
}