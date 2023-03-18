import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { LobbiesModule } from './lobbies/lobbies.module';
import { RoomsModule } from './socials/rooms/rooms.module';
import { ParticipantModule } from './socials/rooms/participant/participant.module';
import { SocialsModule } from './socials/socials.module';
import { MessagesModule } from './socials/rooms/messages/messages.module';
import { ItemsModule } from './items/items.module';
import { InvitationsModule } from './invitations/invitations.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // JwtModule.register({ secret: process.env['AT_SECRET'] }),
    AuthModule,
    PrismaModule,
    UsersModule,
    JwtModule,
    HttpModule,
    RoomsModule,
    ParticipantModule,
    SocialsModule,
    MessagesModule,
    LobbiesModule,
    ItemsModule,
    InvitationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
