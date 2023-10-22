import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ProductDto } from 'src/dto/product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
    constructor(private readonly prisma: PrismaService) { }

    async findAll() {
        return await this.prisma.product.findMany({
            include: {
                categories: {
                    select: {
                        name: true
                    }
                }
            }

        })
    }

    async findProductsByCategories(categoryIds: string[]) {
        const productsInCategories = await this.prisma.product.findMany({
            where: {
                categories: {
                    some: {
                        OR: categoryIds.map((categoryId) => ({
                            id: categoryId,
                        })),
                    },
                },
            },
            include: {
                categories: {
                    select: { name: true }
                }
            }
        });

        const uniqueProducts = [...new Map(productsInCategories.map((product) => [product.id, product])).values()];

        return uniqueProducts;
    }


    async findOne(productId: string) {
        return await this.prisma.product.findUnique({
            where: { id: productId },
            include: {
                categories: true,
            },
        });
    }

    async create(dto: ProductDto) {
        if (dto.categories && Array.isArray(dto.categories)) {
            const product = await this.prisma.product.create({
                data: {
                    ...dto,
                    categories: {
                        connect: dto.categories.map((categoryId) => ({ id: categoryId }))
                    }
                }
            });

            for (const categoryId of dto.categories) {
                await this.prisma.category.update({
                    where: { id: categoryId },
                    data: {
                        products: {
                            connect: { id: product.id }
                        }
                    }
                });
            }

            return await this.prisma.product.findUnique({
                where: { id: product.id },
                include: {
                    categories: {
                        select: {
                            name: true
                        }
                    }
                }
            });
        } else {
            throw new BadRequestException('product must have category')
        }
    }

    async update(productId: string, dto: ProductDto, categoryIds: string[]) {
        const existingProduct = await this.prisma.product.findUnique({
            where: { id: productId },
            include: { categories: true }
        })

        if (!existingProduct) {
            throw new NotFoundException('Product not found');
        }

        // Check if categoryIds is defined and is an array before mapping
        if (categoryIds && Array.isArray(categoryIds)) {
            return await this.prisma.product.update({
                where: { id: productId },
                data: {
                    ...dto,
                    categories: {
                        set: categoryIds.map((categoryId) => ({ id: categoryId }))
                    }
                },
                include: {
                    categories: {
                        select: {
                            name: true
                        }
                    }
                }
            });
        } else {
            // Handle the case where categoryIds is undefined or not an array
            throw new BadRequestException('Invalid category IDs');
        }
    }


    async delete(productId: string) {
        return await this.prisma.product.delete({
            where: { id: productId }
        })
    }
}