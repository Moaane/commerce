import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CategorySearchDto, ProductDto } from 'src/dto/product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get('')
  async findAll() {
    return await this.productService.findAll()
  }

  @Get('category/:id')
  async findProductsByCategories(@Param('id') categoryId: string) {
    return this.productService.findProductsByCategories(categoryId);
  }

  @Get('find/:id')
  async findOne(@Param('id') productId: string) {
    return await this.productService.findOne(productId)
  }

  @Post('create')
  async create(@Body() dto: ProductDto) {
    return this.productService.create({
      ...dto,
      categories: dto.categories,
    });
  }


  @Patch('update/:id')
  async update(@Param('id') productId: string, @Body() dto: ProductDto, categoryIds: string[]) {
    return this.productService.update(productId, dto, categoryIds)
  }

  @Delete('delete/:id')
  async delete(@Param('id') productId: string) {
    return this.productService.delete(productId)
  }
}
