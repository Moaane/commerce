import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @UseGuards(AuthGuard)
    @Post('')
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
