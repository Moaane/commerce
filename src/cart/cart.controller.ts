<<<<<<< HEAD
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
=======
import { Controller } from '@nestjs/common';
import { CartService } from './cart.service';
>>>>>>> 19952119d9f7a45d784a0bbcba2010d673e122cc

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
<<<<<<< HEAD

  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
=======
>>>>>>> 19952119d9f7a45d784a0bbcba2010d673e122cc
}
