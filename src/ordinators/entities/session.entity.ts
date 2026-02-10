import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Ordinator } from './ordinators.entity';

@Entity('session')
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'session_start', type: 'date', nullable: true })
  sessionStart: Date;

  @Column({ name: 'session_end', type: 'date', nullable: true })
  sessionEnd: Date;

  @OneToOne(() => Ordinator, ordinator => ordinator.session)
  ordinator: Ordinator;
}