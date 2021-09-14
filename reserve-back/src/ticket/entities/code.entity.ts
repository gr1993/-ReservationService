import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Code {
  @PrimaryColumn()
  code_type: string;

  @PrimaryColumn()
  code: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  desc: string;
}
