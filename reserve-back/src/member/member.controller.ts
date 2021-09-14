import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Res,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Response } from 'express';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateMemberDto } from './dto/update-member.dto';

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

  @UseGuards(JwtAuthGuard)
  @Get('info')
  async getMember(@Req() req, @Res() res: Response) {
    try {
      const member = await this.memberService.getMember(req.user.id);

      res.status(HttpStatus.OK).send({
        data: {
          id: member.id,
          name: member.name,
          mobile: member.mobile,
        },
        success: true,
        msg: '정보가 조회되었습니다.',
      });
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send({
        success: false,
        msg: err.message,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async update(
    @Req() req,
    @Body() updateMemberDto: UpdateMemberDto,
    @Res() res: Response,
  ) {
    try {
      await this.memberService.update(req.user.id, updateMemberDto);
      res.status(HttpStatus.OK).send({
        success: true,
        msg: '정보가 수정되었습니다.',
      });
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send({
        success: false,
        msg: err.message,
      });
    }
  }
}
