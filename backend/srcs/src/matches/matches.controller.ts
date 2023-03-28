import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { MatchesService } from './matches.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MatchEntity } from './entities/match.entity';

@Controller('matches')
@ApiTags()
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Post()
  @ApiCreatedResponse({ type: MatchEntity})
  async create(
    @Request() req: any,
    @Body()
    createMatchDto: CreateMatchDto): Promise<MatchEntity> {
    const match = await this.matchesService.create(createMatchDto);
    if (match) {
      return match;
    }
  }

  @Get()
  findAll() {
    return this.matchesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.matchesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMatchDto: UpdateMatchDto) {
    return this.matchesService.update(id, updateMatchDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.matchesService.delete(id);
  }
}
