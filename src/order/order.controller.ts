import { Controller, Post, Body, Req } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    async createOrder(
        @Req() req,
        @Body() data: { cartItemIds: string[], productId: string }
    ) {
        const userId = req.user.sub
        const { cartItemIds, productId } = data;
        const order = await this.orderService.createOrder(userId, cartItemIds);
        return order;
    }
}
