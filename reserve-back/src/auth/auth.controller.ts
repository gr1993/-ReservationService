import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() authDto: AuthLoginDto, @Res() res: Response) {
    try {
      const { access_token } = await this.authService.login(authDto);
      res.status(HttpStatus.OK).send({
        data: { access_token },
        success: true,
        msg: '로그인에 성공하였습니다.',
      });
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send({
        success: false,
        msg: err.message,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  refresh(@Res() res: Response) {
    res.status(HttpStatus.OK).send({
      success: true,
      msg: '준비중입니다.',
    });
  }
}
