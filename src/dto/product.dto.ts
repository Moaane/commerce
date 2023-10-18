import { OmitType } from "@nestjs/mapped-types";
import { ProductEntity } from "src/entities/product.entity";

export class ProductDto extends OmitType(ProductEntity, ['id']) {
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    stock: number;
}