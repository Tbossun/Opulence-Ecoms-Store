import { Controller, Get, Render, Param, Res } from '@nestjs/common';
import { ProductsService } from './models/products.service';

@Controller('/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  //   static products = [
  //     {
  //       id: '1',
  //       name: 'T-Shirt',
  //       description: 'A comfortable cotton t-shirt',
  //       image: '/tshirt.jpg',
  //       price: '20',
  //     },
  //     {
  //       id: '2',
  //       name: 'Jeans',
  //       description: 'Classic blue jeans',
  //       image: '/jeans.jpg',
  //       price: '50',
  //     },
  //     {
  //       id: '3',
  //       name: 'Dress',
  //       description: 'Elegant black dress',
  //       image: 'dress.jpg',
  //       price: '70',
  //     },
  //     {
  //       id: '4',
  //       name: 'Sneakers',
  //       description: 'Sporty sneakers',
  //       image: 'sneaker.jpg',
  //       price: '60',
  //     },
  //   ];
  @Get('/')
  @Render('products/index')
  async index() {
    const viewData = [];
    viewData['title'] = 'Products - Online Store';
    viewData['subtitle'] = 'List of products';
    //viewData['products'] = ProductsController.products;
    viewData['products'] = await this.productsService.findAll();
    return {
      viewData: viewData,
    };
  }
  @Get('/:id')
  //@Render('products/show')
  async show(@Param() params, @Res() response) {
    // const product = ProductsController.products[params.id - 1];
    const product = await this.productsService.findOne(params.id);
    if (product === undefined) {
      return response.redirect('/products');
    }
    const viewData = [];
    viewData['title'] = product.name + ' - Online Store';
    viewData['subtitle'] = product.name + ' - Product Information';
    viewData['product'] = product;
    // return {
    //   viewData: viewData,
    // };
    return response.render('products/show', { viewData: viewData });
  }
}
