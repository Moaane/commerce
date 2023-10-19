import { Injectable } from '@nestjs/common';
import { CartService } from 'src/cart/cart.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
    constructor(
        private readonly prisma: PrismaService,
    ) {}

    async createOrder(userId: string, cartItemIds: string[]) {
        const getCart = await this.prisma.cart.findFirst({
            where: { userId: userId },
        });

        if (!getCart) {
            return { status: 200, message: 'Please add items to the cart' };
        }

        const order = await this.prisma.order.create({
            data: { userId },
        });

        const orderItemData = [];

        for (const cartItemId of cartItemIds) {
            const cartItem = await this.prisma.cartItem.findUnique({
                where: { id: cartItemId },
            });

            if (cartItem) {
                const orderItem = {
                    cartItemId,
                    orderId: order.id,
                    quantity: cartItem.quantity,
                };
                orderItemData.push(orderItem);
            }
        }

        const orderItems = await this.prisma.orderItem.createMany({
            data: orderItemData,
        });

        // for (const cartItemId of cartItemIds) {
        //     await this.cartService.deleteCartItem(userId, cartItemId);
        // }

        return orderItems;
    }
}
