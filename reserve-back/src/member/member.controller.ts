import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  async create(@Body() createMemberDto: CreateMemberDto, @Res() res: Response) {
    try {
      await this.memberService.create(createMemberDto);
      res.status(HttpStatus.CREATED).send({
        success: true,
        msg: '회원가입에 성공하였습니다.',
      });
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send({
        success: false,
        msg: err.message,
      });
    }
  }
}
