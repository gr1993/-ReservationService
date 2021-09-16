import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Member } from '../../member/entity/member.entity';
import { Ticket } from './ticket.entity';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn('increment')
  srl: number;

  @Column()
  member_srl: number;

  @Column()
  ticket_srl: number;

  @Column()
  count: number;

  @CreateDateColumn()
  create_date: Date;

  @ManyToOne((type) => Member, (member) => member.members)
  @JoinColumn({ name: 'member_srl' })
  member: Member;

  @ManyToOne((type) => Ticket, (ticket) => ticket.tickets)
  @JoinColumn({ name: 'ticket_srl' })
  ticket: Ticket;
}
