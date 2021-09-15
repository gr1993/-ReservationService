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

  @Column({ nullable: true })
  end_airport: string;

  @CreateDateColumn({ nullable: true })
  start_date: Date;

  @Column({ type: 'float', nullable: true })
  duration_time;

  @Column({ nullable: true })
  price: number;

  @Column({ nullable: true })
  count: number;

  @Column({ nullable: true })
  rest: number;

  @CreateDateColumn()
  create_date: Date;

  @OneToMany((type) => Reservation, (reservation) => reservation.ticket)
  tickets: Ticket[];
}
