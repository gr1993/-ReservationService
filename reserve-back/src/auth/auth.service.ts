import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from './dto/auth.dto';
import { MemberService } from '../member/member.service';
import { encrypt, getSaltBuffer, EncryptResult } from '../helper/encryptHelper';

@Injectable()
export class AuthService {
  constructor(
    private memberService: MemberService,
    private jwtService: JwtService,
  ) {}

  private async validateUser(username: string, password: string) {
    try {
      const member = await this.memberService.getMember(username);
      if (member) {
        const salt = getSaltBuffer(member.salt);
        const encryptResult: EncryptResult = await encrypt(password, {
          salt: salt,
        });
        if (member.password === encryptResult.encryptedText) {
          return {
            id: member.id,
            name: member.name,
          };
        } else {
          return null;
        }
      } else {
        throw Error('존재하지 않는 사용자입니다.');
      }
    } catch (err) {
      throw Error('잘못된 계정정보입니다.');
    }
  }

  async login(authLoginDto: AuthLoginDto) {
    const member = await this.validateUser(
      authLoginDto.id,
      authLoginDto.password,
    );

    if (member) {
      const payload = { id: member.id, name: member.name };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw Error('패스워드가 일치하지 않습니다.');
    }
  }

  async verify(token: string) {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch {
      return null;
    }
  }
}
