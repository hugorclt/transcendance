import {
  WebSocketServer,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

export enum ClientEvents {
  Ping = 'client.ping',
  LobbyCreate = 'client.lobbyCreate',
  LobbyJoin = 'client.lobbyJoin',
  LobbyInvite = 'client.lobbyInvite',
  LobbyDelete = 'client.lobbyDelete',
}

export enum ServerEvents {
  Pong = 'server.pong',
}

@WebSocketGateway({
  namespace: '/game',
  cors: {
    credentials: true,
    origin: ['http://localhost:3002'],
    methods: ['GET', 'POST'],
  },
})
export class GameGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    console.log('Game module init');
    this.server.on('connection', (socket) => {
      console.log('on connection');
    });
  }

  // this function will be used to handle connection / auth / disconnect etc (databse call / token check / etc)
  async handleConnection(client: any) {
    console.log('connection received: ', client);
  }

  @SubscribeMessage(ClientEvents.Ping)
  onPing(client: any): WsResponse<{ message: string }> {
    return {
      event: ServerEvents.Pong,
      data: {
        message: 'pong',
      },
    };
  }

  @SubscribeMessage(ClientEvents.LobbyCreate)
  onLobbyCreateClassic(@MessageBody() payload: { id: string; status: string }) {
    console.log('Request for classic game creation');
    console.log(payload);
  }
}
