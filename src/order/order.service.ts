import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CartItem, Order, Prisma } from '@prisma/client';
import { OrderDto } from 'src/dto/order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
    constructor(private readonly prisma: PrismaService) { }


    async findAll(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId }
        })

        if (!user) {
            throw new UnauthorizedException
        }

        const order = await this.prisma.order.findMany({
            where: { userId }
        })

        if (!order) {
            throw new NotFoundException
        }

        return order
    }

    async findOne(orderItemId: string) {
        return await this.prisma.orderItem.findUnique({
            where: { id: orderItemId }
        })
    }

    async create(userId: string, dto: OrderDto) {
        const cartId = await this.prisma.cart.findUnique({
            where: { userId }
        });

        const selectedCartItemIds = dto.selectedCartItemIds;

        if (!cartId) {
            const cart = await this.prisma.cart.findFirst({
                where: { userId: dto.userId },
                include: {
                    items: {
                        where: {
                            id: { in: selectedCartItemIds }, 
                        },
                        include: {
                            product: true,
                        },
                    },
                },
            });

            if (!cart) {
                throw new NotFoundException('Cart not found');
            }

        }

        const cart = await this.prisma.cart.findUnique({
            where: { userId },
            include: {
                items: {
                    where: {
                        id: { in: selectedCartItemIds }, 
                    },
                    include: {
                        product: true,
                    },
                },
            },
        });

        if (!cart) {
            throw new NotFoundException('Cart not found');
        }

        if (cart.items.length === 0) {
            await this.prisma.cart.delete({
                where: { id: cart.id },
            });
            throw new NotFoundException('Cart is empty');
        }

        const totalAmount = cart.items.reduce((acc, cartItem) => {
            return acc + cartItem.quantity * cartItem.product.price;
        }, 0);

        const order = await this.prisma.order.create({
            data: {
                userId: cart.userId,
                items: {
                    create: cart.items.map((cartItem) => ({
                        quantity: cartItem.quantity,
                        productId: cartItem.product.id,
                    })),
                },
                totalPrice: totalAmount,
            },
        });

        // Mengurangi stok produk
        for (const cartItem of cart.items) {
            const product = await this.prisma.product.findUnique({
                where: { id: cartItem.product.id },
            });

            if (product) {
                // Kurangi stok produk
                await this.prisma.product.update({
                    where: { id: cartItem.product.id },
                    data: {
                        stock: product.stock - cartItem.quantity,
                    },
                });
            }
        }

        // Hapus cart items yang dipilih dari cart setelah order dibuat (opsional)
        await this.prisma.cartItem.deleteMany({
            where: {
                id: { in: selectedCartItemIds },
            },
        });

        return { success: 'Order created', order };
    }

    async delete(orderId: string) {
        const deleteOrderIds = await this.prisma.orderItem.deleteMany({
            where: { orderId }
        })

        return await this.prisma.order.delete({
            where: { id: orderId }
        })
    }
}
