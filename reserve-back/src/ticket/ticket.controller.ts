import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ReserveTicketDto } from './dto/reserve-ticket.dto';
import { SearchTicketDto } from './dto/search-ticket.dto';
import { TicketService } from './ticket.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get('seed')
  seed() {
    return this.ticketService.insertSeed();
  }

  @Get('airline')
  async getAirlineCode(@Res() res: Response) {
    try {
      const data = await this.ticketService.getAirlineCode();
      res.status(HttpStatus.OK).send({
        data,
        success: true,
        msg: '조회되었습니다.',
      });
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send({
        success: false,
        msg: err.message,
      });
    }
  }

  @Get('airport/list')
  async getAirportList(@Query('type') type: string, @Res() res: Response) {
    try {
      const data = await this.ticketService.getAirportList(type);
      res.status(HttpStatus.OK).send({
        data,
        success: true,
        msg: '조회되었습니다.',
      });
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send({
        success: false,
        msg: err.message,
      });
    }
  }

  @Get()
  async search(@Query() condition: SearchTicketDto, @Res() res: Response) {
    try {
      const [data, count] = await this.ticketService.search(condition);
      res.status(HttpStatus.OK).send({
        data,
        success: true,
        msg: '조회되었습니다.',
        totalCount: count,
      });
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send({
        success: false,
        msg: err.message,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('reserve')
  async reserve(
    @Req() req,
    @Body() ticketDto: ReserveTicketDto,
    @Res() res: Response,
  ) {
    try {
      await this.ticketService.reserve(req.user.id, ticketDto);
      res.status(HttpStatus.OK).send({
        success: true,
        msg: '예약이 완료되었습니다.',
      });
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send({
        success: false,
        msg: err.message,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('reserve/cancel')
  async reserveCancel(@Req() req, @Body() body, @Res() res: Response) {
    try {
      await this.ticketService.reserveCancel(req.user.id, body.resSrls);
      res.status(HttpStatus.OK).send({
        success: true,
        msg: '예약이 취소되었습니다.',
      });
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send({
        success: false,
        msg: err.message,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('reserve/check')
  async check(@Req() req, @Res() res: Response) {
    try {
      const [data, count] = await this.ticketService.check(req.user.id);
      res.status(HttpStatus.OK).send({
        data,
        success: true,
        msg: '조회되었습니다.',
        totalCount: count,
      });
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send({
        success: false,
        msg: err.message,
      });
    }
  }
}
