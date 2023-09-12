import { Module, Global } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { TypeOrmConfig } from '../typeorm.config';
import { ProductsService } from './models/products.service';
import { Product } from './models/product.entity';
import { AdminModule } from './admin/admin.module';
import { UsersService } from './models/users.service';
import { User } from './models/user.entity';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { OrdersService } from './models/orders.service';
import { Order } from './models/order.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    TypeOrmModule.forFeature([Product, User, Order]),
    AdminModule,
    AuthModule,
    CartModule,
  ],
  controllers: [AppController, ProductsController],
  providers: [ProductsService, UsersService, OrdersService],
  exports: [ProductsService, UsersService, OrdersService],
})
export class AppModule {}
