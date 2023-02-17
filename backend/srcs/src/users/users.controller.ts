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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { ReturnUserEntity } from './entities/return-user.entity';
import { JwtAuthGuard } from 'src/auth/utils/guards';

@Controller('users')
// @UseGuards(JwtAuthGuard)
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: ReturnUserEntity })
  create(@Body() createUserDto: CreateUserDto): Promise<ReturnUserEntity>{
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({ type: ReturnUserEntity, isArray: true })
  findAll(): Promise<ReturnUserEntity[]> {
    return this.usersService.findAll();
  }

  @Get('connected')
  @ApiOkResponse({ type: ReturnUserEntity, isArray: true })
  findConnected(): Promise<ReturnUserEntity[]> {
    return this.usersService.findConnected();
  }

  @Get(':id')
  @ApiOkResponse({ type: ReturnUserEntity })
  findOne(@Param('id') id: string): Promise<ReturnUserEntity> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ReturnUserEntity })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ReturnUserEntity> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserEntity })
  remove(@Param('id') id: string): Promise<ReturnUserEntity> {
    return this.usersService.remove(id);
  }
}
