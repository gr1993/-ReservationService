import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

const WAITING_MAMBERS = 'waiting_mambers';
const TICKETING_MEMBERS = 'ticketing_mambers';

interface RedisMember {
  memberId: string;
  expiryDate: number;
}

interface RedisMemberStatus {
  memberCount: string;
  isEntered: string;
}

@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  private async getArray(key): Promise<RedisMember[]> {
    return await this.cache.get(key);
  }

  private async setArray(key, value) {
    await this.cache.set(key, value);
  }

  private async insertMemberInRoom(
    memberId: string,
    roomName: string,
    ttl: number,
  ): Promise<void> {
    const array = await this.getArray(roomName);
    let expiryDate = new Date().getTime();
    expiryDate += ttl * 1000; // 초 단위
    const newMember = {
      memberId,
      expiryDate,
    };

    if (!array || array.length === 0) {
      this.setArray(roomName, [newMember]);
    } else {
      const index = array.findIndex((m) => m.memberId == memberId);

      if (index > -1) {
        array[index].expiryDate = expiryDate;
        this.setArray(roomName, array);
      } else {
        array.push(newMember);
        this.setArray(roomName, array);
      }
    }
  }

  private async removeMemberInRoom(
    memberId: string,
    roomName: string,
  ): Promise<void> {
    let array = await this.getArray(roomName);
    if (!array || array.length === 0) {
      return;
    }

    const index = array.findIndex((m) => m.memberId == memberId);
    if (index > -1) {
      array = array.filter((m, i) => i != index);
    }

    this.setArray(roomName, array);
  }

  async insertWaiting(memberId: string): Promise<void> {
    await this.insertMemberInRoom(memberId, WAITING_MAMBERS, 3600);
  }
  async insertTicketing(memberId: string): Promise<void> {
    await this.insertMemberInRoom(memberId, TICKETING_MEMBERS, 30);
  }

  async removeWaiting(memberId: string): Promise<void> {
    await this.removeMemberInRoom(memberId, WAITING_MAMBERS);
  }
  async removeTicketing(memberId: string): Promise<void> {
    await this.removeMemberInRoom(memberId, TICKETING_MEMBERS);
  }
}
