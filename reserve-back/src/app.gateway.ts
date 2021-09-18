import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { AuthService } from './auth/auth.service';
import { RedisCacheService } from './cache/redisCache.service';

let test = '';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private cacheService: RedisCacheService,
    private authService: AuthService,
  ) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('enterReservation')
  async handleMessage(client: Socket, payload: string) {
    // eslint-disable-next-line prettier/prettier
    const token = client.handshake.query.token as string;
    const member = await this.authService.verify(token);

    test = member.id;

    this.cacheService.insertWaiting(member.id);
  }

  afterInit(server: Server) {
    return null;
  }

  handleDisconnect(client: Socket) {
    this.cacheService.removeWaiting(test);
  }

  handleConnection(client: Socket, ...args: any[]) {
    return null;
  }
}
