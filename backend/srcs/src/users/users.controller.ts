import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  ReturnUserEntity,
  ReturnUserEntityWithPreferences,
} from './entities/return-user.entity';
import { AccessAuthGard } from 'src/auth/utils/guards';
import { Request } from '@nestjs/common';
import { RemoveFriendsDto } from './dto/remove-friend.dto';
import { UserPreferencesEntity } from './entities/user-preferences.entity';
import { addFriendDto } from './dto/add-friend.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
@UseGuards(AccessAuthGard)
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: ReturnUserEntity })
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ReturnUserEntity> {
    return await this.usersService.create(createUserDto);
  }

  @Get('blocked')
  async getBlocked(@Request() req) : Promise<string[]> {
    return await this.usersService.getBlocked(req.user.sub);
  }

  @Get()
  @ApiOkResponse({ type: ReturnUserEntity, isArray: true })
  async findAll(): Promise<ReturnUserEntity[]> {
    console.log('a');
    return await this.usersService.findAll();
  }

  @Get('/friends')
  @ApiOkResponse({ type: ReturnUserEntity, isArray: true })
  async getUserFriends(@Request() req): Promise<ReturnUserEntity[]> {
    console.log('a2');
    return await this.usersService.getUserFriends(req.user.sub);
  }

  @Get('connected')
  @ApiOkResponse({ type: ReturnUserEntity, isArray: true })
  async findConnected(): Promise<ReturnUserEntity[]> {
    console.log('b');
    return await this.usersService.findConnected();
  }

  @Get('me')
  @ApiOkResponse({ type: ReturnUserEntity })
  async findInfo(@Request() req): Promise<ReturnUserEntity> {
    console.log('c');
    return await this.usersService.findOne(req.user.sub);
  }

  @Get('status')
  @ApiOkResponse({ type: ReturnUserEntity })
  async findStatus(@Request() req): Promise<ReturnUserEntity> {
    console.log('d');
    const user = await this.usersService.findOne(req.user.sub);
    return user;
  }

  @Post('me/visibility')
  @ApiOkResponse({ type: ReturnUserEntityWithPreferences, isArray: true })
  async updateVisibility(
    @Request() req,
  ): Promise<ReturnUserEntityWithPreferences> {
    return await this.usersService.updateVisibility(
      req.user.sub,
      req.body.status,
    );
  }

  @Get('me/preferences')
  @ApiOkResponse({ type: UserPreferencesEntity })
  async getUserPreferences(@Request() req): Promise<UserPreferencesEntity> {
    console.log('e');
    const preferences = await this.usersService.getUserPreferences(
      req.user.sub,
    );
    return preferences;
  }

  @Get('user/:username')
  @ApiOkResponse({ type: ReturnUserEntity})
  async getUserByUsername(@Param('username') username: string): Promise<ReturnUserEntity> {
    console.log("ICI");
    return await this.usersService.findOneByUser(username);
  }

  @Get(':id')
  @ApiOkResponse({ type: ReturnUserEntity })
  async findOne(@Param('id') id: string): Promise<ReturnUserEntity> {
    console.log("LA");
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ReturnUserEntity })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ReturnUserEntity> {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ReturnUserEntity })
  async remove(@Param('id') id: string): Promise<ReturnUserEntity> {
    return await this.usersService.remove(id);
  }

  @Post('/friends/add')
  @ApiOkResponse()
  async addFriend(@Request() req: any, @Body() addFriendDto: addFriendDto) {
    return await this.usersService.addFriend(addFriendDto);
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
    return removed;
  }

  @Post('update-picture')
  @UseInterceptors(FileInterceptor('picture'))
  async uploadFile(@Request() req, @UploadedFile() file: Express.Multer.File) {
    return await this.usersService.updateAvatar(req.user.sub, file.buffer);
  }

  @Post('update-username')
  async updateUsername(@Request() req) {
    return await this.usersService.updateUsername(
      req.user.sub,
      req.body.username,
    );
  }

  @Post('update-password')
  async updatePassword(@Request() req) {
    return await this.usersService.updatePassword(
      req.user.sub,
      req.body.password,
    );
  }

  @Post('/block')
  async blockUser(@Request() req) {
    return await this.usersService.blockUser(
      req.user.sub,
      req.body.id,
    )
  }

  @Post("/unblock")
  async unblock(@Request() req) {
    return await this.usersService.unBlockUser(
      req.user.sub,
      req.body.username
    )
  }
}
