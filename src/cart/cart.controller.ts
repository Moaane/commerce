import { Controller, Param, Req } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  async findAll(@Req() req) {
    const userId = req.user.sub
    return await this.cartService.findAll(userId)
  }

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
