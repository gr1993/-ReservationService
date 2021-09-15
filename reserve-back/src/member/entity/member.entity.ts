import { Reservation } from '../../ticket/entities/reservation.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Member {
  @PrimaryGeneratedColumn('increment')
  srl: number;

  @Column()
  id: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  mobile: string;

  @CreateDateColumn()
  create_date: Date;

  @Column()
  salt: string;

  @OneToMany((type) => Reservation, (reservation) => reservation.member)
  members: Member[];
}
