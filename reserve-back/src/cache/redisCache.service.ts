import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

const WAITING_MEMBERS = 'waiting_members';
const TICKETING_MEMBERS = 'ticketing_members';

interface RedisMember {
  memberId: string;
  expiryDate: number;
}

interface RedisMemberStatus {
  memberCount: number;
  isContained: boolean;
  index: number;
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

  async initArray(): Promise<void> {
    this.setArray(WAITING_MEMBERS, []);
    this.setArray(TICKETING_MEMBERS, []);
  }

  async getWaitingStatus(memberId: string): Promise<RedisMemberStatus> {
    const array = await this.getArray(WAITING_MEMBERS);
    const status = {
      memberCount: 0,
      isContained: false,
      index: -1,
    };

    if (!array || array.length === 0) {
      return status;
    }

    status.memberCount = array.length;
    const index = array.findIndex((m) => m.memberId == memberId);
    if (index > -1) {
      status.isContained = true;
      status.index = index;
    }
    return status;
  }
  async getTicketingCount(): Promise<number> {
    const array = await this.getArray(TICKETING_MEMBERS);
    if (!array || !array.length) {
      return 0;
    }
    return array.length;
  }

  async insertWaiting(memberId: string): Promise<void> {
    await this.insertMemberInRoom(memberId, WAITING_MEMBERS, 3600);
  }
  async insertTicketing(memberId: string): Promise<void> {
    await this.insertMemberInRoom(memberId, TICKETING_MEMBERS, 30);
  }

  async removeWaiting(memberId: string): Promise<void> {
    await this.removeMemberInRoom(memberId, WAITING_MEMBERS);
  }
  async removeTicketing(memberId: string): Promise<void> {
    await this.removeMemberInRoom(memberId, TICKETING_MEMBERS);
  }
}
