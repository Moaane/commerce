import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { ProfileModule } from './profile/profile.module';
import { CartModule } from './cart/cart.module';
import { CategoryModule } from './category/category.module';
import { AdminModule } from './admin/admin.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, ProductModule, ProfileModule, CartModule, CategoryModule, AdminModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
