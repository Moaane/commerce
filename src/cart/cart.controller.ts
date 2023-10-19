import { Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  async findAll(@Req() req) {
    const userId = req.user.sub
    return await this.cartService.findAll(userId)
  }

  @UseGuards(AuthGuard)
  @Post('create/:id')
  async create(@Req() req, @Param('id') productId: string) {
    const userId = req.user.sub
    return await this.cartService.create(userId, productId)
  }

  async addQuantityCartItem(@Param('id') cartItemId: string) {
    return await this.cartService.addQuantityCartItem(cartItemId)
  }

  async decreaseQuantityCartItem(@Param('id') cartItemId: string) {
    return await this.cartService.decreaseQuantityCartItem(cartItemId)
  }

  async deleteCartItem(@Req() req, @Param('id') cartItemId: string) {
    const userId = req.user.sub
    return await this.cartService.deleteCartItem(userId, cartItemId)
  }

}
