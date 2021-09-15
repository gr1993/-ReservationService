import { Controller, Get, HttpStatus, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { TicketService } from './ticket.service';

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
}
