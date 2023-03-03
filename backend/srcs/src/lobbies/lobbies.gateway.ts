import { OnGatewayInit, WebSocketGateway } from '@nestjs/websockets';
import { LobbiesService } from './lobbies.service';

@WebSocketGateway({
  namespace: 'lobbies',
})
export class LobbiesGateway implements OnGatewayInit {
  constructor(private lobbiesService: LobbiesService) {}

  //Gateway initialized
  afterInit(server: any) {
    console.log('Gateway initialized');
  }
}
