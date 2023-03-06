import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { UsersModule } from "src/users/users.module";
import { SocialsModule } from "../socials.module";
import { ParticipantService } from "./participant/participant.service";
import { RoomsController } from "./rooms.controller";
import { RoomsService } from "./rooms.service";

@Module({
  imports: [SocialsModule, PrismaModule, UsersModule],
  controllers: [RoomsController],
  providers: [RoomsService, ParticipantService],
  exports: [RoomsService]
})
export class RoomsModule {}
