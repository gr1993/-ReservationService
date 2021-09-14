import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Reservation } from './reservation.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn('increment')
  srl: number;

  @Column()
  airline: string;

  @Column()
  start_airport: string;

  @Column()
  end_airport: string;

  @CreateDateColumn()
  start_date: Date;

  @Column({ type: 'float' })
  duration_time;

  @Column()
  price: number;

  @Column()
  count: number;

  @Column()
  rest: number;

  @CreateDateColumn()
  create_date: Date;

  @OneToMany((type) => Reservation, (reservation) => reservation.ticket)
  tickets: Ticket[];
}
