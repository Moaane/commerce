import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartService {
    constructor(private readonly prisma: PrismaService) { }

    async findAll(userId: string) {
        const existingCart = await this.prisma.cart.findUnique({
            where: { userId }
        })

        if (!existingCart) {
            return { status: 200, message: 'Cart is empty' }
        }

        const cartItem = await this.prisma.cartItem.findMany({
            where: { cartId: existingCart.id }
        })

        if (!cartItem) {
            return existingCart
        }

        return cartItem
    }

    async create(userId: string, productId: string) {
        const existingCart = await this.prisma.cart.findUnique({
            where: { userId }
        })

        if (!existingCart) {
            const newCart = await this.prisma.cart.create({
                data: { userId }
            })

            return await this.prisma.cartItem.create({
                data: {
                    cartId: newCart.id,
                    productId,
                    quantity: 1
                }
            })
        }

        return await this.prisma.cartItem.create({
            data: {
                cartId: existingCart.id,
                productId,
                quantity: 1
            }
        })
    }

    async addQuantityCartItem(cartItemId: string) {
        return await this.prisma.cartItem.update({
            where: { id: cartItemId },
            data: { quantity: { increment: 1 } }
        })
    }

    async decreaseQuantityCartItem(cartItemId: string) {
        return await this.prisma.cartItem.update({
            where: { id: cartItemId },
            data: { quantity: { decrement: 1 } }
        })
    }

    async deleteCartItem(userId: string, cartItemId: string) {
        await this.prisma.cartItem.delete({
            where: { id: cartItemId }
        })

        const cart = await this.prisma.cart.findUnique({
            where: { userId }
        })

        const itemCount = await this.prisma.cartItem.count({
            where: { cartId: cart.id }
        });

        if (itemCount === 0) {
            return await this.prisma.cart.delete({
                where: { userId }
            })
        }

        return { status: 204, message: 'Cart item successfully deleted' }
    }

}
