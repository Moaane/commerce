<<<<<<< HEAD
import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  create(createCartDto: CreateCartDto) {
    return 'This action adds a new cart';
  }

  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
=======
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
>>>>>>> 19952119d9f7a45d784a0bbcba2010d673e122cc
}
