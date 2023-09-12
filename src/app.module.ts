import { Module, Global } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { TypeOrmConfig } from '../typeorm.config';
import { ProductsService } from './models/products.service';
import { Product } from './models/product.entity';
import { AdminModule } from './admin/admin.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    TypeOrmModule.forFeature([Product]),
    AdminModule,
  ],
  controllers: [AppController, ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class AppModule {}
