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
import { InvitationsService } from './invitations.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { AccessAuthGard } from 'src/auth/utils/guards';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { InvitationEntity } from './entities/invitation.entity';
import { SocialsGateway } from 'src/socials/socials.gateway';

@Controller('invitations')
@UseGuards(AccessAuthGard)
@ApiTags('invitations')
export class InvitationsController {
  constructor(
    private readonly invitationsService: InvitationsService,
    private readonly socialsGateway: SocialsGateway,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: InvitationEntity })
  async create(
    @Body() createInvitationDto: CreateInvitationDto,
  ): Promise<InvitationEntity> {
    const invitation = await this.invitationsService.create(
      createInvitationDto,
    );
    console.log('emitting invitations to user via social gateway');
    this.socialsGateway.emitToUser(invitation.userId, 'invitation', invitation);
    if (invitation.type == 'LOBBY') {
      //should send pending invitation to players inside lobby
      // this.lobbiesGateway.emitToRoom(
      //   invitation.lobbyId,
      //   'pending-invitation',
      //   invitation,
      // );
    }
    return invitation;
  }

  @Post('createMany')
  @ApiCreatedResponse({ type: InvitationEntity, isArray: true })
  async createMany(
    @Body() invitationDtoList: CreateInvitationDto[],
  ): Promise<InvitationEntity[]> {
    const invitations = await this.invitationsService.createMany(
      invitationDtoList,
    );
    console.log('emitting invitations to users via social gateway');
    invitations.map((invit) => {
      this.socialsGateway.emitToUser(invit.userId, 'invitation', invit);
      if (invit.type == 'LOBBY') {
        //should send pending invitation to players inside lobby
        // this.lobbiesGateway.emitToRoom(
        //   invitation.lobbyId,
        //   'pending-invitation',
        //   invitation,
        // );
      }
    });
    return invitations;
  }

  @Get()
  @ApiOkResponse({ type: InvitationEntity, isArray: true })
  async findAll(): Promise<InvitationEntity[]> {
    return await this.invitationsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: InvitationEntity })
  async findOne(@Param('id') id: string): Promise<InvitationEntity> {
    return await this.invitationsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: InvitationEntity })
  async update(
    @Param('id') id: string,
    @Body() updateInvitationDto: UpdateInvitationDto,
  ): Promise<InvitationEntity> {
    return await this.invitationsService.update(id, updateInvitationDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: InvitationEntity })
  async remove(@Param('id') id: string): Promise<InvitationEntity> {
    return await this.invitationsService.remove(id);
  }
}
