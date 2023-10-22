import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CategorySearchDto, ProductDto } from 'src/dto/product.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get('')
  async findAll() {
    return await this.productService.findAll()
  }

  @Get('category/:categoryIds')
  async findProductsByCategories(@Param('categoryIds') categoryIds: string) {
    const categoryIdArray = categoryIds.split(','); // Membagi path parameter menjadi array
    return this.productService.findProductsByCategories(categoryIdArray);
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
  async update(
    @Param('id') productId: string,
    @Body() dto: ProductDto,
  ) {
    const { categories } = dto; // Extract categories from the DTO

    if (!Array.isArray(categories)) {
      throw new BadRequestException('Invalid category IDs');
    }

    return this.productService.update(productId, dto, categories);
  }

  @Delete('delete/:id')
  async delete(@Param('id') productId: string) {
    return this.productService.delete(productId)
  }
}
