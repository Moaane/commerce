import { Product } from "@prisma/client";

export class ProductEntity implements Product {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    stock: number;
    isActive: boolean;
}