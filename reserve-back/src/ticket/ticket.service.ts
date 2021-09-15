import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { Code } from './entities/code.entity';
import { Ticket } from './entities/ticket.entity';

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
    @InjectRepository(Code) private codeRepository: Repository<Code>,
    @InjectRepository(Ticket) private ticketRepository: Repository<Ticket>,
  ) {}

  async GetAirlineCode() {
    return await this.codeRepository.find({
      select: ['code', 'title'],
      where: {
        code_type: '1000',
      },
    });
  }

  async GetAirportList(type: string) {
    const airports = await this.ticketRepository
      .createQueryBuilder('ticket')
      .select(type)
      .groupBy(type)
      .getRawMany();
    return airports;
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
          new Date(2021, 9, 20, 9),
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
          new Date(2021, 9, 20, 10, 30),
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
          new Date(2021, 9, 20, 12),
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
          new Date(2021, 9, 21, 9),
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
          new Date(2021, 9, 21, 10, 30),
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
          new Date(2021, 9, 21, 12),
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
          new Date(2021, 9, 21, 9),
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
          new Date(2021, 9, 21, 10),
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
          new Date(2021, 9, 21, 11),
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
          new Date(2021, 9, 21, 12),
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
          new Date(2021, 9, 21, 13),
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
          new Date(2021, 9, 22, 9),
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
          new Date(2021, 9, 22, 10),
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
          new Date(2021, 9, 22, 11),
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
          new Date(2021, 9, 22, 12),
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
          new Date(2021, 9, 22, 13),
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
          new Date(2021, 9, 20, 9),
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
          new Date(2021, 9, 20, 11),
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
          new Date(2021, 9, 20, 13),
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
          new Date(2021, 9, 21, 9, 20),
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
          new Date(2021, 9, 21, 11, 40),
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
          new Date(2021, 9, 21, 12, 20),
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
          new Date(2021, 9, 21, 10, 50),
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
          new Date(2021, 9, 22, 9),
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
          new Date(2021, 9, 22, 10),
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
          new Date(2021, 9, 22, 11),
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