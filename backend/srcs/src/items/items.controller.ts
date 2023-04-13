import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ItemEntity } from './entities/item.entity';
import { AccessAuthGard } from 'src/auth/utils/guards';

@Controller('items')
@UseGuards(AccessAuthGard)
@ApiTags('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  @ApiOkResponse({ type: ItemEntity, isArray: true })
  findAll() {
    return this.itemsService.findAll();
  }
}
