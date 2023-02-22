import { Module } from "@nestjs/common"
import { PrismaModule } from "src/prisma/prisma.module";
import { MyGateway } from "./gateway";

@Module({
    providers: [MyGateway],
    imports: [PrismaModule]
})
export class GatewayModule {} 