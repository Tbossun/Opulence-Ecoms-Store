import {
  Controller,
  Get,
  Render,
  Redirect,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Param,
  Req,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from '../models/products.service';
import { Product } from 'src/models/product.entity';
import { ProductValidator } from '../validators/product.validator';
import * as fs from 'fs';

@Controller('/admin/products')
export class AdminProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/')
  @Render('admin/products/index')
  async index() {
    const viewData: Record<string, any> = {}; // Use a proper type for viewData
    viewData.title = 'Admin Page - Admin - Online Store';
    viewData.products = await this.productsService.findAll();
    return {
      viewData,
    };
  }

  @Post('/store')
  @UseInterceptors(FileInterceptor('image', { dest: './public/uploads' }))
  async store(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
    @Req() request,
    @Res() response,
  ) {
    const toValidate: string[] = [
      'name',
      'description',
      'price',
      'imageCreate',
    ];
    const errors: string[] = ProductValidator.validate(body, file, toValidate);

    if (errors.length > 0) {
      if (file) {
        fs.unlinkSync(file.path);
      }

      // Flash validation errors to the session
      request.session.flashErrors = errors;

      // Redirect back to the form page with validation errors
      return response.redirect('/admin/products'); // You can specify the URL to redirect to
    } else {
      const newProduct = new Product();
      newProduct.setName(body.name);
      newProduct.setDescription(body.description);
      newProduct.setPrice(body.price);
      newProduct.setImage(file.filename);
      await this.productsService.createOrUpdate(newProduct);

      // Redirect to the admin products page after successful form submission
      return response.redirect('/admin/products'); // You can specify the URL to redirect to
    }
  }

  @Post('/:id')
  @Redirect('/admin/products')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @Get('/:id')
  @Render('admin/products/edit')
  async edit(@Param('id') id: number) {
    const viewData = [];
    viewData['title'] = 'Admin Page - Edit Product - Online Store';
    viewData['product'] = await this.productsService.findOne(id);
    return {
      viewData: viewData,
    };
  }
  @Post('/:id/update')
  @UseInterceptors(FileInterceptor('image', { dest: './public/uploads' }))
  @Redirect('/admin/products')
  async update(
    @Body() body,
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
    @Req() request,
    @Res() response,
  ) {
    const toValidate: string[] = [
      'name',
      'description',
      'price',
      'imageUpdate',
    ];
    const errors: string[] = ProductValidator.validate(body, file, toValidate);
    if (errors.length > 0) {
      if (file) {
        fs.unlinkSync(file.path);
      }
      request.session.flashErrors = errors;
      return response.redirect('/admin/products/' + id);
    } else {
      const product = await this.productsService.findOne(id);
      product.setName(body.name);
      product.setDescription(body.description);
      product.setPrice(body.price);
      if (file) {
        product.setImage(file.filename);
      }
      await this.productsService.createOrUpdate(product);
      return response.redirect('/admin/products/');
    }
  }
}
