import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductDto } from 'src/dto/product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
    constructor(private readonly prisma: PrismaService) { }

    async findAll() {
        return await this.prisma.product.findMany()
    }

    async findProductsByCategories(categoryIds: string[]) {
        const productsInCategories = await this.prisma.product.findMany({
            where: {
                categories: {
                    every: {
                        id: {
                            in: categoryIds,
                        },
                    },
                },
            },
        });

        return productsInCategories;
    }


    async findOne(productId: string) {
        return await this.prisma.product.findFirst({
            where: { id: productId }
        })
    }

    async create(dto: ProductDto, categoryIds: string[]) {
        return await this.prisma.product.create({
            data: {
                ...dto,
                categories: {
                    connect: categoryIds.map((categoryId) => ({ id: categoryId }))
                }
            }
        })
    }

    async update(productId: string, dto: ProductDto, categoryIds: string[]) {
        const existingProduct = await this.prisma.product.findUnique({
            where: { id: productId },
            include: { categories: true }
        })

        if (!existingProduct) {
            throw new NotFoundException('product not found')
        }

        return await this.prisma.product.update({
            where: { id: productId },
            data: {
                ...dto,
                categories: {
                    set: categoryIds.map((categoryId) => ({ id: categoryId }))
                }
            }
        })
    }

    async delete(productId: string) {
        return await this.prisma.product.delete({
            where: { id: productId }
        })
    }
}
