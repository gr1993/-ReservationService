import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { RedisCacheService } from './cache/redisCache.service';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private cacheService: RedisCacheService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    this.server.emit('msgToClient', payload);
  }

  afterInit(server: Server) {
    this.cacheService.set('test', 'data2');
    this.cacheService.get('test').then((data) => {
      const tees = data;
      const test2 = '';
    });
    return null;
  }

  handleDisconnect(client: Socket) {
    return null;
  }

  handleConnection(client: Socket, ...args: any[]) {
    return null;
  }
}
