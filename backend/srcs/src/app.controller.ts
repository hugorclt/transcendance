import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor( private readonly appService: AppService, ) {}

  @Get()
  getIndex(): any {
    return this.appService.getHello();
  }
}
