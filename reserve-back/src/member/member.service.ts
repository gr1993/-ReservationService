import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';

@Injectable()
export class MemberService {
  constructor(private connection: Connection) {}

  async create(createMemberDto: CreateMemberDto) {
    const member = new Member();
    member.id = createMemberDto.id;
    member.password = createMemberDto.password;
    member.name = createMemberDto.password;
    member.mobile = createMemberDto.mobile;

    const memberRepository = this.connection.getRepository(Member);

    await memberRepository.save(member);
    return member.srl;
  }

  findOne(id: number) {
    return `This action returns a #${id} member`;
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }
}
