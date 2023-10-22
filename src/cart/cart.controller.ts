import { Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Get()
  async findAll(@Req() req) {
    const userId = req.user.sub
    return await this.cartService.findAll(userId)
  }

  @Post('create/:id')
  async create(@Req() req, @Param('id') productId: string) {
    const userId = req.user.sub
    return await this.cartService.create(userId, productId)
  }

  @Post('add/:id')
  async addQuantityCartItem(@Param('id') cartItemId: string) {
    return await this.cartService.addQuantityCartItem(cartItemId)
  }

  @Post('dec/:id')
  async decreaseQuantityCartItem(@Param('id') cartItemId: string) {
    return await this.cartService.decreaseQuantityCartItem(cartItemId)
  }

  @Delete('delete/:id')
  async deleteCartItem(@Req() req, @Param('id') cartItemId: string) {
    const userId = req.user.sub
    return await this.cartService.deleteCartItem(userId, cartItemId)
  }

}
