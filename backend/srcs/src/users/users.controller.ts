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
import {
  ReturnUserEntity,
  ReturnUserEntityWithPreferences,
} from './entities/return-user.entity';
import { AccessAuthGard } from 'src/auth/utils/guards';
import { Request } from '@nestjs/common';
import { SocialsGateway } from 'src/socials/socials.gateway';
import { RemoveFriendsDto } from './dto/remove-friend.dto';
import { UserPreferencesEntity } from './entities/user-preferences.entity';

@Controller('users')
@UseGuards(AccessAuthGard)
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly socialGateway: SocialsGateway,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: ReturnUserEntity })
  create(@Body() createUserDto: CreateUserDto): Promise<ReturnUserEntity> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({ type: ReturnUserEntity, isArray: true })
  findAll(): Promise<ReturnUserEntity[]> {
    return this.usersService.findAll();
  }

  @Get('/friends')
  @ApiOkResponse({ type: ReturnUserEntity, isArray: true })
  getUserFriends(@Request() req): Promise<ReturnUserEntity[]> {
    return this.usersService.getUserFriends(req.user.sub);
  }

  @Get('connected')
  @ApiOkResponse({ type: ReturnUserEntity, isArray: true })
  findConnected(): Promise<ReturnUserEntity[]> {
    return this.usersService.findConnected();
  }

  @Get('me')
  @ApiOkResponse({ type: ReturnUserEntity })
  findInfo(@Request() req): Promise<ReturnUserEntity> {
    return this.usersService.findOne(req.user.sub);
  }

  @Get('status')
  @ApiOkResponse({ type: ReturnUserEntity })
  async findStatus(@Request() req): Promise<ReturnUserEntity> {
    const user = await this.usersService.findOne(req.user.sub);
    return user;
  }

  @Post('me/visibility')
  @ApiOkResponse({ type: ReturnUserEntityWithPreferences, isArray: true })
  async updateVisibility(
    @Request() req,
  ): Promise<ReturnUserEntityWithPreferences> {
    const user = await this.usersService.updateVisibility(
      req.user.sub,
      req.body.status,
    );
    if (user) {
      this.socialGateway.sendVisibilityUpdate(req.user.sub);
    }
    return user;
  }

  @Get('me/preferences')
  @ApiOkResponse({ type: UserPreferencesEntity })
  async getUserPreferences(@Request() req): Promise<UserPreferencesEntity> {
    const preferences = await this.usersService.getUserPreferences(
      req.user.sub,
    );
    return preferences;
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
  @ApiOkResponse({ type: ReturnUserEntity })
  remove(@Param('id') id: string): Promise<ReturnUserEntity> {
    return this.usersService.remove(id);
  }

  @Post('/friends/remove')
  @ApiOkResponse({ type: ReturnUserEntity })
  async removeFriends(
    @Request() req,
    @Body() removeFriendsDto: RemoveFriendsDto,
  ): Promise<ReturnUserEntity> {
    const removed = await this.usersService.removeFriends(
      req.user.sub,
      removeFriendsDto.usernameToRemove,
    );
    this.socialGateway.removeFriend(
      req.user.sub,
      removeFriendsDto.usernameToRemove,
    );
    this.socialGateway.removeFriend(removed.id, req.user.username);
    return removed;
  }
}
