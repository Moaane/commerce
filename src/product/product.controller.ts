import { Body, Controller, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from 'src/dto/product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  async findAll() {
    return await this.productService.findAll()
  }

  async findProductsByCategory(@Param('categoryIds') categoryIds: string) {
    const categories = categoryIds.split(',');
    return await this.productService.findProductsByCategories(categories);

  }

  async findOne(@Param('id') productId: string) {
    return await this.productService.findOne(productId)
  }

  async create(@Body() dto: ProductDto, categoryIds: string[]) {
    return this.productService.create(dto, categoryIds)
  }

  async update(@Param('id') productId: string, @Body() dto: ProductDto, categoryIds: string[]) {
    return this.productService.update(productId, dto, categoryIds)
  }

  async delete(@Param('id') productId: string) {
    return this.productService.delete(productId)
  }
}
