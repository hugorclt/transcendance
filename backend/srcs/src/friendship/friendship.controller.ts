import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { UpdateFriendshipDto } from './dto/update-friendship.dto';
import { AccessAuthGard } from 'src/auth/utils/guards';
import { ApiTags } from '@nestjs/swagger';
import { FriendShip } from '@prisma/client';

@Controller('friendship')
@UseGuards(AccessAuthGard)
@ApiTags('friendship')
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  @Post("/create")
  create(@Request() req, @Body() createFriendshipDto: CreateFriendshipDto) : Promise<FriendShip> {
    return this.friendshipService.create(createFriendshipDto, req.user.sub);
  }

  @Get()
  findAll() {
    return this.friendshipService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.friendshipService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFriendshipDto: UpdateFriendshipDto) {
    return this.friendshipService.update(+id, updateFriendshipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.friendshipService.remove(+id);
  }
}
