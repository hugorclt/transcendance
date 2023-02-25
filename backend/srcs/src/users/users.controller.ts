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
import { AccessAuthGard } from 'src/auth/utils/guards';
import { Request } from '@nestjs/common';

@Controller('users')
@UseGuards(AccessAuthGard)
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

  @Get('me')
  @ApiOkResponse({ type: ReturnUserEntity, isArray: true })
  findInfo(@Request() req): Promise<ReturnUserEntity> {
    return this.usersService.findOne(req.user.sub);
  }

  @Post('me/status')
  @ApiOkResponse({ type: ReturnUserEntity, isArray: true })
  updateStatus(@Request() req): Promise<ReturnUserEntity> {
    return this.usersService.updateStatus(req.user.sub, req.body.status);
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
