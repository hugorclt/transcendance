import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { ItemsService } from './items.service';
import { AccessAuthGard } from 'src/auth/utils/guards';

@Controller('items')
@UseGuards(AccessAuthGard)
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  findAll(@Request() req) {
    return this.itemsService.findAll(req.user.sub);
  }

  @Post('/buy')
  buyItem(@Request() req) {
    return this.itemsService.buyItem(req.user.sub, req.body.name);
  }

  @Get('/user-items')
  getUserItem(@Request() req) {
    return this.itemsService.getUserItem(req.user.sub);
  }

  @Post('has-item')
  hasItem(@Request() req) {
    return this.itemsService.hasItem(req.user.sub, req.body.name);
  }
}
