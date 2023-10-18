import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartService {
    constructor(private readonly prisma: PrismaService) { }

    async get(userId: string) {
        return await this.prisma.cart.findUnique({
            where: { userId }
        })
    }

    async addProduct(userId: string, productId: string) {
        const isProductAvail = await this.prisma.product.findUnique({
            where: { id: productId }
        })

        if (!isProductAvail || isProductAvail.stock < 1) {
            throw new BadRequestException('product is not available')
        }

        

    }
}
