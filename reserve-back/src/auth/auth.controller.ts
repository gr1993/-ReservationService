import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() authDto: AuthLoginDto, @Res() res: Response) {
    try {
      const { access_token } = await this.authService.login(authDto);
      res.status(HttpStatus.CREATED).send({
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
}
