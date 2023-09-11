import { Controller, Get, Render, Param } from '@nestjs/common';
@Controller('/products')
export class ProductsController {
  static products = [
    {
      id: '1',
      name: 'T-Shirt',
      description: 'A comfortable cotton t-shirt',
      image: '/tshirt.jpg',
      price: '20',
    },
    {
      id: '2',
      name: 'Jeans',
      description: 'Classic blue jeans',
      image: '/jeans.jpg',
      price: '50',
    },
    {
      id: '3',
      name: 'Dress',
      description: 'Elegant black dress',
      image: 'dress.jpg',
      price: '70',
    },
    {
      id: '4',
      name: 'Sneakers',
      description: 'Sporty sneakers',
      image: 'sneaker.jpg',
      price: '60',
    },
  ];
  @Get('/')
  @Render('products/index')
  index() {
    const viewData = [];
    viewData['title'] = 'Products - Online Store';
    viewData['subtitle'] = 'List of products';
    viewData['products'] = ProductsController.products;
    return {
      viewData: viewData,
    };
  }
  @Get('/:id')
  @Render('products/show')
  show(@Param() params) {
    const product = ProductsController.products[params.id - 1];
    const viewData = [];
    viewData['title'] = product.name + ' - Online Store';
    viewData['subtitle'] = product.name + ' - Product Information';
    viewData['product'] = product;
    return {
      viewData: viewData,
    };
  }
}