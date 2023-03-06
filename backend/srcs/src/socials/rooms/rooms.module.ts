import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { UsersModule } from "src/users/users.module";
import { SocialsGateway } from "../socials.gateway";
import { SocialsModule } from "../socials.module";
import { SocialsService } from "../socials.service";
import { ParticipantService } from "./participant/participant.service";
import { RoomsController } from "./rooms.controller";
import { RoomsService } from "./rooms.service";

@Module({
  imports: [ PrismaModule, UsersModule],
  controllers: [RoomsController],
  providers: [RoomsService, ParticipantService, SocialsGateway, SocialsService],
  exports: [RoomsService]
})
export class RoomsModule {}
