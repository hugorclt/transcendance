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

  @Post()
  @ApiCreatedResponse({ type: ItemEntity })
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Get()
  @ApiOkResponse({ type: ItemEntity, isArray: true })
  findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ItemEntity })
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ItemEntity })
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(id, updateItemDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ItemEntity })
  remove(@Param('id') id: string) {
    return this.itemsService.remove(id);
  }
}
