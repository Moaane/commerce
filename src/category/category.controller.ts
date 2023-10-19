import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from 'src/dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Get('')
  async findAll() {
    return await this.categoryService.findAll()
  }

  @Post('create')
  async create(@Body() dto: CategoryDto) {
    return await this.categoryService.create(dto)
  }
}
