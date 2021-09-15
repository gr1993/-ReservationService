import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Code } from './entities/code.entity';
import { Ticket } from './entities/ticket.entity';
import { Reservation } from './entities/reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Code, Ticket, Reservation])],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
