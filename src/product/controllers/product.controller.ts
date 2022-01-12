import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateProductDto } from '../dto/product.dto';
import { Product } from '../entities/product.entity';
import { ProductService } from '../services/product.service';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('create')
  public async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    const product = await this.productService.createProduct(createProductDto);
    return product;
  }

  @Get('all')
  public async getProducts(): Promise<Product[]> {
    const products = await this.productService.getProducts();
    return products;
  }

  @Get('/:productId')
  public async getProduct(@Param('productId') productId: number) {
    const product = await this.productService.getProduct(productId);
    return product;
  }

  @Patch('/edit/:productId')
  public async editProduct(
    @Body() createProductDto: CreateProductDto,
    @Param('productId') productId: number,
  ): Promise<Product> {
    const product = await this.productService.editProduct(
      productId,
      createProductDto,
    );
    return product;
  }

  @Delete('/delete/:productId')
  public async deleteProduct(@Param('productId') productId: number) {
    const deletedProduct = await this.productService.deleteProduct(productId);
    return deletedProduct;
  }
}
