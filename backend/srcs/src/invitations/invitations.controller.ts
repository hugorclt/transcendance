import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { AccessAuthGard } from 'src/auth/utils/guards';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  InvitationEntity,
  InvitationExtendedEntity,
} from './entities/invitation.entity';

@Controller('invitations')
@UseGuards(AccessAuthGard)
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}

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
      req.user,
    );
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
    return invitationDeclined;
  }

  @Get()
  @ApiOkResponse({ type: InvitationEntity, isArray: true })
  async findAll(@Request() req) {
    return await this.invitationsService.findForUser(req.user.sub);
  }
}
