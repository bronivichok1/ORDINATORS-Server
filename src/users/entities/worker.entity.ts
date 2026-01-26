import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('workers')
export class Worker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'FIO' })
  fio: string;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  @Column()
  role: string;
}