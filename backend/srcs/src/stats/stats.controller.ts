import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { StatsService } from './stats.service';
import { CreateStatDto } from './dto/create-stat.dto';
import { UpdateStatDto } from './dto/update-stat.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { StatEntity } from './entities/stat.entity';
import { AccessAuthGard } from 'src/auth/utils/guards';

@Controller('stats')
@ApiTags('stats')
@UseGuards(AccessAuthGard)
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Post()
  @ApiCreatedResponse({ type: StatEntity })
  async create(
    @Request() req: any,
    @Body()
    createStatDto: CreateStatDto,
  ): Promise<StatEntity> {
    const stat = await this.statsService.create(createStatDto);
    if (stat) {
      return stat;
    }
  }

  @Get()
  @ApiOkResponse({ type: StatEntity, isArray: true })
  async findAll(): Promise<StatEntity[]> {
    return this.statsService.findAll();
  }

  @Get('user/:id')
  @ApiOkResponse({ type: StatEntity })
  async findOneByUserId(@Param('id') id: string): Promise<StatEntity> {
    return this.statsService.findOneByUserId(id);
  }

  @Get(':id')
  @ApiOkResponse({ type: StatEntity })
  async findOne(@Param('id') id: string): Promise<StatEntity> {
    return this.statsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: StatEntity })
  async update(
    @Param('id') id: string,
    @Body() updateStatDto: UpdateStatDto,
  ): Promise<StatEntity> {
    return this.statsService.update(id, updateStatDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: StatEntity })
  delete(@Param('id') id: string): Promise<StatEntity> {
    return this.statsService.delete(id);
  }
}
