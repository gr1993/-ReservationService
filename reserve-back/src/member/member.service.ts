import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMemberDto } from './dto/create-member.dto';
import { Member } from './entity/member.entity';
import { encrypt, EncryptResult } from '../helper/encryptHelper';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member) private memberRepository: Repository<Member>,
  ) {}

  async getMember(id: string): Promise<Member> {
    const member = await this.memberRepository.findOne({
      where: { id: id },
    });
    return member;
  }

  async create(createMemberDto: CreateMemberDto) {
    const member = await this.getMember(createMemberDto.id);
    if (member) {
      throw Error('이미 존재하는 아이디 입니다.');
    }

    const encryptResult: EncryptResult = await encrypt(
      createMemberDto.password,
    );

    const newMember = new Member();
    newMember.id = createMemberDto.id;
    newMember.password = encryptResult.encryptedText;
    newMember.name = createMemberDto.name;
    newMember.mobile = createMemberDto.mobile;
    newMember.salt = encryptResult.salt.toString('base64');

    await this.memberRepository.save(newMember);
    return newMember.srl;
  }
}
