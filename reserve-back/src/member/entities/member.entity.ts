import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
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

  @Column()
  mobile: string;

  @CreateDateColumn()
  create_date: Date;
}
