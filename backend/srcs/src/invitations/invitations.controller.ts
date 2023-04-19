import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { AccessAuthGard } from 'src/auth/utils/guards';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  InvitationEntity,
  InvitationExtendedEntity,
} from './entities/invitation.entity';

@Controller('invitations')
@UseGuards(AccessAuthGard)
@ApiTags('invitations')
export class InvitationsController {
  constructor(
    private readonly invitationsService: InvitationsService,
  ) {}

  @Get('notif-checked')
  async notifChecked(@Request() req) {
    console.log("cc", req.user);
    return await this.notifChecked(req.user.sub);
  }

  @Post()
  @ApiCreatedResponse({ type: InvitationEntity })
  async create(
    @Request() req: any,
    @Body() createInvitationDto: CreateInvitationDto,
  ): Promise<InvitationExtendedEntity> {
    const invitation = await this.invitationsService.create(
      createInvitationDto,
      req.user,
    );
    // if (invitation.type == 'LOBBY') {
    //should send pending invitation to players inside lobby
    // this.lobbiesGateway.emitToRoom(
    //   invitation.lobbyId,
    //   'pending-invitation',
    //   invitation,
    // );
    // }
    return invitation;
  }

  @Post('createMany')
  @ApiCreatedResponse({ type: InvitationEntity, isArray: true })
  async createMany(
    @Request() req: any,
    @Body() invitationDtoList: CreateInvitationDto[],
  ): Promise<InvitationEntity[]> {
    const invitations = await this.invitationsService.createMany(
      invitationDtoList,
      req.user.sub,
    );
    // invitations.map((invit) => {
    //   this.socialsGateway.emitToUser(invit.userId, 'invitation', invit);
    //   if (invit.type == 'LOBBY') {
    //     //should send pending invitation to players inside lobby
    //     // this.lobbiesGateway.emitToRoom(
    //     //   invitation.lobbyId,
    //     //   'pending-invitation',
    //     //   invitation,
    //     // );
    //   }
    // });
    return invitations;
  }

  @Post('decline')
  @ApiOkResponse({ type: InvitationEntity })
  async decline(
    @Request() req: any,
    @Body() invitation: { id: string },
  ): Promise<InvitationEntity> {
    const invitationDeclined = await this.invitationsService.decline(
      invitation.id,
      req.user.sub,
    );
    if (invitationDeclined.type == 'LOBBY') {
      //TODO: should send invitation canceled to players in lobby
      // await this.lobbiesGateway.emitToRoom(invitationDeclined.lobbyId, 'on-invitation-declined', invitationDeclined);
    }
    return invitationDeclined;
  }

  @Get()
  @ApiOkResponse({ type: InvitationEntity, isArray: true })
  async findAll(
    @Request() req,
  ) {
    return await this.invitationsService.findForUser(req.user.sub);
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
