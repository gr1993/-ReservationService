import { IsNumber } from 'class-validator';

export class ReserveTicketDto {
  @IsNumber({}, { each: true })
  ticketSrls: number[];

  @IsNumber()
  count: number;
}
