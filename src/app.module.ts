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
<<<<<<< HEAD

=======
import { OrderModule } from './order/order.module';
>>>>>>> ac2841689cedd43c1f9ee3cc4c771fbcd1fdbc5f

@Module({
  imports: [PrismaModule, UserModule, AuthModule, ProductModule, ProfileModule, CartModule, CategoryModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
