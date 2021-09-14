import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMemberDto } from './dto/create-member.dto';
import { Member } from './entity/member.entity';
import { encrypt, EncryptResult } from '../helper/encryptHelper';
import { UpdateMemberDto } from './dto/update-member.dto';

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

  async update(memberId: string, updateMemberDto: UpdateMemberDto) {
    const member = await this.getMember(memberId);
    if (!member) {
      throw Error('존재하지 않는 아이디입니다.');
    }

    const updateProperty = {};
    if (updateMemberDto.password) {
      const encryptResult: EncryptResult = await encrypt(
        updateMemberDto.password,
      );
      updateProperty['password'] = encryptResult.encryptedText;
      updateProperty['salt'] = encryptResult.salt.toString('base64');
    }
    updateProperty['name'] = updateMemberDto.name;
    updateProperty['mobile'] = updateMemberDto.mobile;

    await this.memberRepository.update({ id: member.id }, updateProperty);
  }
}
