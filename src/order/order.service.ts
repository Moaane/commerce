import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
    constructor (private readonly prisma : PrismaService){}

    async createOrder (userId: string){
        const getCart = await this.prisma.order.findFirst({
            where: {userId: userId}
        })

        if(!getCart){
            return {status : 200 , message: 'please masukin ke dalam cart '}
        }

        const orderCart = await this.prisma.orderItem.findMany({
            where :{
                orderId : getCart.id
            }
        })

        if (!orderCart) {
            return orderCart
        }

    }
    

}
