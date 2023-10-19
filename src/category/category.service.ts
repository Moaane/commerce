import { Injectable } from '@nestjs/common';
import { CategoryDto } from 'src/dto/category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
    constructor(private readonly prisma: PrismaService) { }

    async findAll() {
        return await this.prisma.category.findMany()
    }

    async create(dto: CategoryDto) {
        return await this.prisma.category.create({ data: { name: dto.name } })
    }
}
