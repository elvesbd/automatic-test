import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../repository/product.repository';
import { ProductService } from '../services/product.service';
import { mockCreateProduct } from './mocks/create-product';
import { mockProduct } from './mocks/product';

describe('ProductService', () => {
  let productService;
  let productRepository;

  const mockProductRepository = {
    createProduct: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: ProductRepository,
          useFactory: () => mockProductRepository,
        },
      ],
    }).compile();
    productService = await module.get<ProductService>(ProductService);
    productRepository = await module.get<ProductRepository>(ProductRepository);
  });

  describe('createProduct', () => {
    test('should save a product in the database', async () => {
      productRepository.createProduct.mockResolvedValue('someProduct');
      expect(productRepository.createProduct).not.toHaveBeenCalled();

      const result = await productService.createProduct(mockCreateProduct);
      expect(productRepository.createProduct).toHaveBeenCalledWith(
        mockCreateProduct,
      );
      expect(result).toEqual('someProduct');
    });
  });

  describe('getProducts', () => {
    test('should get all products', async () => {
      productRepository.find.mockResolvedValue('someProducts');
      expect(productRepository.find).not.toHaveBeenCalled();

      const result = await productService.getProducts();
      expect(productRepository.find).toHaveBeenCalled();
      expect(result).toEqual('someProducts');
    });
  });

  describe('getProduct', () => {
    test('should retrieve a product with an ID', async () => {
      productRepository.findOne.mockResolvedValue(mockProduct);
      const result = await productService.getProduct(1);
      expect(result).toEqual(mockProduct);
      expect(productRepository.findOne).toHaveBeenCalledWith(1);
    });

    test('throws an error as a product is not found', () => {
      productRepository.findOne.mockResolvedValue(null);
      expect(productService.getProduct(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteProduct', () => {
    test('should delete product', async () => {
      productRepository.delete.mockResolvedValue(1);
      expect(productRepository.delete).not.toHaveBeenCalled();
      await productService.deleteProduct(1);
      expect(productRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
