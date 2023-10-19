import { OmitType } from "@nestjs/mapped-types";
import { ProductEntity } from "src/entities/product.entity";

export class ProductDto extends OmitType(ProductEntity, ['id']) {
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    stock: number;
    categories: string[]
}
// category-search.dto.ts
export class CategorySearchDto {
    categoryIds: string[]; // Ini akan menjadi daftar ID kategori yang ingin Anda cari
  }
  