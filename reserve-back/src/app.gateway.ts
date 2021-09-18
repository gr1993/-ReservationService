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

const user = {};

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private cacheService: RedisCacheService,
    private authService: AuthService,
  ) {}
  @WebSocketServer() server: Server;

  @SubscribeMessage('enterWaiting')
  async handleEnterWaiting(client: Socket, payload: string) {
    // eslint-disable-next-line prettier/prettier
    const token = client.handshake.query.token as string;
    const member = await this.authService.verify(token);

    this.cacheService.insertWaiting(member.id);
    user[client.id] = member.id;
  }

  @SubscribeMessage('check')
  async handleCheck(client: Socket, payload: string) {
    const status = await this.cacheService.getWaitingStatus(user[client.id]);
    client.emit('check', status);
  }

  @SubscribeMessage('enterTicketing')
  async handleEnterTicketing(client: Socket, payload: string) {
    const status = await this.cacheService.getWaitingStatus(user[client.id]);
    const maxCount = Number(process.env.WAIT_ROOM_MEMBER_COUNT);

    if (status.isContained && status.index < maxCount) {
      this.cacheService.removeWaiting(user[client.id]);
      this.cacheService.insertTicketing(user[client.id]);
    }
  }

  afterInit(server: Server) {
    return null;
  }

  handleDisconnect(client: Socket) {
    this.cacheService.removeWaiting(user[client.id]);
    this.cacheService.removeTicketing(user[client.id]);
    delete user[client.id];
  }

  handleConnection(client: Socket, ...args: any[]) {
    return null;
  }
}
