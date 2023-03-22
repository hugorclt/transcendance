import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { UsersModule } from "src/users/users.module";


@Module({
    imports: [PrismaModule, UsersModule],
    controllers: [],
    providers: [],
})
export class GameModule {}