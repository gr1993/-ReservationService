import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  getConnection,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { ReserveTicketDto } from './dto/reserve-ticket.dto';
import { SearchTicketDto } from './dto/search-ticket.dto';
import { Code } from './entities/code.entity';
import { Reservation } from './entities/reservation.entity';
import { Ticket } from './entities/ticket.entity';
import { MemberService } from '../member/member.service';
import { RetunCheckDto } from './dto/return-check.dto';

const MAX_PAGE_COUNT = 5;

const createCode = (
  code_type: string,
  code: string,
  title: string,
  desc: string,
): Code => {
  const newCode = new Code();
  newCode.code_type = code_type;
  newCode.code = code;
  newCode.title = title;
  newCode.desc = desc;

  return newCode;
};
const createTicket = (
  airline: string,
  start_airport: string,
  end_airport: string,
  start_date: Date,
  duration_time: number,
  price: number,
  count: number,
  rest: number,
): Ticket => {
  const newTicket = new Ticket();
  newTicket.airline = airline;
  newTicket.start_airport = start_airport;
  newTicket.end_airport = end_airport;
  newTicket.start_date = start_date;
  newTicket.duration_time = duration_time;
  newTicket.price = price;
  newTicket.count = count;
  newTicket.rest = rest;

  return newTicket;
};

@Injectable()
export class TicketService {
  constructor(
    private memberService: MemberService,
    @InjectRepository(Code) private codeRepository: Repository<Code>,
    @InjectRepository(Ticket) private ticketRepository: Repository<Ticket>,
    @InjectRepository(Reservation)
    private resRepository: Repository<Reservation>,
  ) {}

  async getAirlineCode() {
    return await this.codeRepository.find({
      select: ['code', 'title'],
      where: {
        code_type: '1000',
      },
    });
  }

  async getAirportList(type: string) {
    const airports = await this.ticketRepository
      .createQueryBuilder('ticket')
      .select(type)
      .groupBy(type)
      .getRawMany();
    return airports;
  }

  async search(condition: SearchTicketDto) {
    const whereObejct = {
      rest: MoreThanOrEqual(condition.memberCount),
    };

    if (condition.airline) {
      whereObejct['airline'] = condition.airline;
    }
    if (condition.startAirport) {
      whereObejct['start_airport'] = condition.startAirport;
    }
    if (condition.endAirport) {
      whereObejct['end_airport'] = condition.endAirport;
    }
    if (condition.startDate) {
      whereObejct['start_date'] = MoreThanOrEqual(condition.startDate);
    }

    const selectObject: FindManyOptions<Ticket> = {
      select: [
        'srl',
        'airline',
        'start_airport',
        'end_airport',
        'start_date',
        'duration_time',
        'price',
        'count',
        'rest',
      ],
      where: whereObejct,
      order: {
        start_date: 'ASC',
      },
    };
    if (condition.pageNumber) {
      selectObject['skip'] = (condition.pageNumber - 1) * MAX_PAGE_COUNT;
      selectObject['take'] = MAX_PAGE_COUNT;
    }

    return await this.ticketRepository.findAndCount(selectObject);
  }

  async reserve(memberId: string, ticketDto: ReserveTicketDto) {
    const member = await this.memberService.getMember(memberId);

    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      for (let i = 0; i < ticketDto.ticketSrls.length; i++) {
        const ticketSrl = ticketDto.ticketSrls[i];

        const newReservation: Reservation = new Reservation();
        newReservation.member_srl = member.srl;
        newReservation.ticket_srl = ticketSrl;
        newReservation.count = ticketDto.count;

        await queryRunner.manager.save<Reservation>(newReservation);

        const ticket = await this.ticketRepository.findOne({
          where: { srl: ticketSrl },
        });
        await queryRunner.manager.update(
          Ticket,
          { srl: ticketSrl },
          {
            rest: ticket.rest - ticketDto.count,
          },
        );
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async reserveCancel(memberId: string, resSrls: number[]) {
    if (!resSrls || !resSrls.length) {
      throw new Error('취소할 항공권을 선택하세요.');
    }

    const member = await this.memberService.getMember(memberId);

    const reservations = await this.resRepository
      .createQueryBuilder('res')
      .innerJoinAndSelect('res.ticket', 'tic')
      .whereInIds(resSrls)
      .andWhere('res.member_srl = :member_srl', { member_srl: member.srl })
      .getMany();

    if (resSrls.length != reservations.length) {
      throw new Error('삭제할 수 없는 항공권이 포함되어 있습니다.');
    }

    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      for (let i = 0; i < reservations.length; i++) {
        const nextCount = reservations[i].ticket.rest + reservations[i].count;
        await queryRunner.manager.update(
          Ticket,
          { srl: reservations[i].ticket.srl },
          {
            rest: nextCount,
          },
        );
      }

      await queryRunner.manager.remove<Reservation>(reservations);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async check(memberId: string): Promise<[RetunCheckDto[], number]> {
    const member = await this.memberService.getMember(memberId);

    const result = await this.resRepository
      .createQueryBuilder('res')
      .innerJoinAndSelect('res.ticket', 'tic')
      .where('res.member_srl = :member_srl', { member_srl: member.srl })
      .getMany();

    const data = result.map((res) => {
      const dto: RetunCheckDto = new RetunCheckDto();
      dto.srl = res.srl;
      dto.airline = res.ticket.airline;
      dto.start_airport = res.ticket.start_airport;
      dto.end_airport = res.ticket.end_airport;
      dto.start_date = res.ticket.start_date;
      dto.duration_time = res.ticket.duration_time;
      dto.price = res.ticket.price;
      dto.count = res.count;

      return dto;
    });
    const count = data.length;

    return [data, count];
  }

  async insertSeed(): Promise<void> {
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(
        createCode('1000', '10', '대한항공', '항공사'),
      );
      await queryRunner.manager.save(
        createCode('1000', '20', '아시아나', '항공사'),
      );
      await queryRunner.manager.save(
        createTicket(
          '10',
          '인천공항',
          '프랑스공항',
          new Date(2021, 8, 20, 9),
          4,
          680000,
          7,
          7,
        ),
      );
      await queryRunner.manager.save(
        createTicket(
          '10',
          '인천공항',
          '프랑스공항',
          new Date(2021, 8, 20, 10, 30),
          4,
          680000,
          7,
          7,
        ),
      );
      await queryRunner.manager.save(
        createTicket(
          '10',
          '인천공항',
          '프랑스공항',
          new Date(2021, 8, 20, 12),
          4,
          680000,
          7,
          7,
        ),
      );
      await queryRunner.manager.save(
        createTicket(
          '10',
          '인천공항',
          '프랑스공항',
          new Date(2021, 8, 21, 9),
          4,
          680000,
          7,
          7,
        ),
      );
      await queryRunner.manager.save(
        createTicket(
          '10',
          '인천공항',
          '프랑스공항',
          new Date(2021, 8, 21, 10, 30),
          4,
          680000,
          7,
          7,
        ),
      );
      await queryRunner.manager.save(
        createTicket(
          '10',
          '인천공항',
          '프랑스공항',
          new Date(2021, 8, 21, 12),
          4,
          680000,
          7,
          7,
        ),
      );
      await queryRunner.manager.save(
        createTicket(
          '10',
          '인천공항',
          '일본공항',
          new Date(2021, 8, 21, 9),
          1,
          150000,
          10,
          10,
        ),
      );
      await queryRunner.manager.save(
        createTicket(
          '10',
          '인천공항',
          '일본공항',
          new Date(2021, 8, 21, 10),
          1,
          150000,
          10,
          10,
        ),
      );
      await queryRunner.manager.save(
        createTicket(
          '10',
          '인천공항',
          '일본공항',
          new Date(2021, 8, 21, 11),
          1,
          150000,
          10,
          10,
        ),
      );
      await queryRunner.manager.save(
        createTicket(
          '10',
          '인천공항',
          '일본공항',
          new Date(2021, 8, 21, 12),
          1,
          150000,
          10,
          10,
        ),
      );
      await queryRunner.manager.save(
        createTicket(
          '10',
          '인천공항',
          '일본공항',
          new Date(2021, 8, 21, 13),
          1,
          150000,
          10,
          10,
        ),
      );
      await queryRunner.manager.save(
        createTicket(
          '10',
          '인천공항',
          '일본공항',
          new Date(2021, 8, 22, 9),
          1,
          150000,
          10,
          10,
        ),
      );
      await queryRunner.manager.save(
        createTicket(
          '10',
          '인천공항',
          '일본공항',
          new Date(2021, 8, 22, 10),
          1,
          150000,
          10,
          10,
        ),
      );
      await queryRunner.manager.save(
        createTicket(
          '10',
          '인천공항',
          '일본공항',
          new Date(2021, 8, 22, 11),
          1,
          150000,
          10,
          10,
        ),
      );
      await queryRunner.manager.save(
        createTicket(
          '10',
          '인천공항',
          '일본공항',
          new Date(2021, 8, 22, 12),
          1,
          150000,
          10,
          10,
        ),
      );
      await queryRunner.manager.save(
        createTicket(
          '10',
          '인천공항',
          '일본공항',
          new Date(2021, 8, 22, 13),
          1,
          150000,
          10,
          10,
        ),
      );
      await queryRunner.manager.save(
        createTicket(
          '20',
          '김포공항',
          '일본공항',
          new Date(2021, 8, 20, 9),
          1,
          150000,
          10,
          10,
        ),
      );
      await queryRunner.manager.save(
        createTicket(
          '20',
          '김포공항',
          '일본공항',
          new Date(2021, 8, 20, 11),
          1,
          150000,
          10,
          10,
        ),
      );
      await queryRunner.manager.save(
        createTicket(
          '20',
          '김포공항',
          '일본공항',
          new Date(2021, 8, 20, 13),
          1,
          150000,
          10,
          10,
        ),
      );
      await queryRunner.manager.save(
        createTicket(
          '20',
          '김포공항',
          '미국공항',
          new Date(2021, 8, 21, 9, 20),
          11,
          1500000,
          4,
          4,
        ),
      );
      await queryRunner.manager.save(
        createTicket(
          '20',
          '김포공항',
          '미국공항',
          new Date(2021, 8, 21, 11, 40),
          11,
          1500000,
          4,
          4,
        ),
      );
      await queryRunner.manager.save(
        createTicket(
          '20',
          '인천공항',
          '미국공항',
          new Date(2021, 8, 21, 12, 20),
          11,
          1500000,
          4,
          4,
        ),
      );
      await queryRunner.manager.save(
        createTicket(
          '20',
          '인천공항',
          '영국공항',
          new Date(2021, 8, 21, 10, 50),
          6,
          1220000,
          3,
          3,
        ),
      );
      await queryRunner.manager.save(
        createTicket(
          '20',
          '인천공항',
          '중국공항',
          new Date(2021, 8, 22, 9),
          2,
          230000,
          9,
          9,
        ),
      );
      await queryRunner.manager.save(
        createTicket(
          '20',
          '인천공항',
          '중국공항',
          new Date(2021, 8, 22, 10),
          2,
          230000,
          9,
          9,
        ),
      );
      await queryRunner.manager.save(
        createTicket(
          '20',
          '인천공항',
          '중국공항',
          new Date(2021, 8, 22, 11),
          2,
          230000,
          9,
          9,
        ),
      );

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
