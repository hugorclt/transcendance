import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
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
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ReturnUserEntity> {
    return await this.usersService.create(createUserDto);
  }

  @Get('blocked')
  async getBlocked(@Request() req): Promise<string[]> {
    return await this.usersService.getBlocked(req.user.sub);
  }

  @Get()
  async findAll(): Promise<ReturnUserEntity[]> {
    return await this.usersService.findAll();
  }

  @Get('/friends')
  async getUserFriends(@Request() req): Promise<ReturnUserEntity[]> {
    return await this.usersService.getUserFriends(req.user.sub);
  }

  @Get('connected')
  async findConnected(): Promise<ReturnUserEntity[]> {
    return await this.usersService.findConnected();
  }

  @Get('is2fa')
  async is2fa(@Request() req): Promise<boolean> {
    return await this.usersService.is2fa(req.user.sub);
  }

  @Post('set2fa')
  async set2fa(@Request() req) {
    return await this.usersService.set2fa(req.user.sub, req.body.activated);
  }

  @Get('me')
  async findInfo(@Request() req): Promise<ReturnUserEntity> {
    return await this.usersService.findOne(req.user.sub);
  }

  @Get('status')
  async findStatus(@Request() req): Promise<ReturnUserEntity> {
    const user = await this.usersService.findOne(req.user.sub);
    return user;
  }

  @Post('me/visibility')
  async updateVisibility(
    @Request() req,
  ): Promise<ReturnUserEntityWithPreferences> {
    return await this.usersService.updateVisibility(
      req.user.sub,
      req.body.status,
    );
  }

  @Get('me/preferences')
  async getUserPreferences(@Request() req): Promise<UserPreferencesEntity> {
    const preferences = await this.usersService.getUserPreferences(
      req.user.sub,
    );
    return preferences;
  }

  @Get('user/:username')
  async getUserByUsername(
    @Param('username') username: string,
  ): Promise<ReturnUserEntity> {
    return await this.usersService.findOneByUser(username);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ReturnUserEntity> {
    return await this.usersService.findOne(id);
  }

  @Post('/friends/add')
  async addFriend(@Request() req: any, @Body() addFriendDto: addFriendDto) {
    return await this.usersService.addFriend(addFriendDto);
  }

  @Post('/friends/remove')
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
    return await this.usersService.blockUser(req.user.sub, req.body.id);
  }

  @Post('/unblock')
  async unblock(@Request() req) {
    return await this.usersService.unBlockUser(req.user.sub, req.body.username);
  }
}
