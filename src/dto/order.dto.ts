import { OmitType } from "@nestjs/mapped-types";
import { OrdeItemEntity } from "src/entities/order.entity";

export class OrderDto extends OmitType(OrdeItemEntity, ['id']) {
    selectedCartItemIds: string[];
}