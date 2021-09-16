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
  async GetAirlineCode(@Res() res: Response) {
    try {
      const data = await this.ticketService.GetAirlineCode();
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
  async GetAirportList(@Query('type') type: string, @Res() res: Response) {
    try {
      const data = await this.ticketService.GetAirportList(type);
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
  async Search(@Query() condition: SearchTicketDto, @Res() res: Response) {
    try {
      const [data, count] = await this.ticketService.Search(condition);
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
  @Post('Reserve')
  async Reserve(
    @Req() req,
    @Body() ticketDto: ReserveTicketDto,
    @Res() res: Response,
  ) {
    try {
      await this.ticketService.Reserve(req.user.id, ticketDto);
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
}
