import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { UsersModule } from "src/users/users.module";
import { GameGateway } from "./game.gateway";


@Module({
    imports: [PrismaModule, UsersModule],
    controllers: [],
    providers: [GameGateway],
})
export class GameModule {}