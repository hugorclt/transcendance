import { PartialType } from '@nestjs/swagger';
import { CreateFriendshipDto } from './create-friendship.dto';

export class UpdateFriendshipDto extends PartialType(CreateFriendshipDto) {}
