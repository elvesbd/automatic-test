import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './controllers/product.controller';
import { ProductRepository } from './repository/product.repository';
import { ProductService } from './services/product.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository])],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
