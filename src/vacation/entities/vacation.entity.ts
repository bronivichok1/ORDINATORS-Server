import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Ordinator } from '../../ordinators/entities/ordinator.entity';

@Entity('vacation')
export class Vacation {
  @PrimaryGeneratedColumn()
  vacation_id: number;

  @Column({ type: 'text', nullable: true })
  cause: string;

  @Column({ type: 'text', nullable: true })
  duration: string;

  @ManyToOne(() => Ordinator, o => o.vacations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ordinators_id' })
  ordinator: Ordinator;
}