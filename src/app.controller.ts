import { Controller, Get, Render } from '@nestjs/common';
@Controller()
export class AppController {
  @Get('/')
  @Render('index')
  index() {
    const viewData = [];
    viewData['title'] = 'Home Page - Opulence Store';
    return {
      viewData: viewData,
    };
  }
  @Get('/about')
  @Render('about')
  about() {
    const viewData = [];
    viewData['title'] = 'About us - Opulence Store';
    viewData['subtitle'] = 'About us';
    viewData['description'] = 'This is an about page ...';
    viewData['author'] = 'Developed by: Sodiq Alabi';
    return {
      viewData: viewData,
    };
  }
}
