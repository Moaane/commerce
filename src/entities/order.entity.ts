import { OrderItem } from "@prisma/client";

export class OrdeItemEntity implements OrderItem {
    id: string;
    quantity: number;
    userId: string;
    productId: string;
    orderId: string;
}