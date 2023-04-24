import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MatchesService } from './matches.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MatchEntity } from './entities/match.entity';
import { AccessAuthGard } from 'src/auth/utils/guards';

@Controller('matches')
@ApiTags('matches')
@UseGuards(AccessAuthGard)
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Post()
  @ApiCreatedResponse({ type: MatchEntity })
  async create(
    @Request() req: any,
    @Body()
    createMatchDto: CreateMatchDto,
  ): Promise<MatchEntity> {
    const match = await this.matchesService.create(createMatchDto);
    if (match) {
      return match;
    }
  }

  @Get()
  @ApiOkResponse({ type: MatchEntity, isArray: true })
  async findAll(): Promise<MatchEntity[]> {
    return await this.matchesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: MatchEntity })
  async findOne(@Param('id') id: string): Promise<MatchEntity> {
    return await this.matchesService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: MatchEntity })
  async update(
    @Param('id') id: string,
    @Body() updateMatchDto: UpdateMatchDto,
  ): Promise<MatchEntity> {
    return this.matchesService.update(id, updateMatchDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: MatchEntity })
  delete(@Param('id') id: string): Promise<MatchEntity> {
    return this.matchesService.delete(id);
  }
}
