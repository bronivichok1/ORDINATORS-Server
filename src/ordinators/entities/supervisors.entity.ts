import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Ordinator } from './ordinators.entity';

@Entity('supervisors')
export class Supervisor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'supervisor_name' })
  supervisorName: string;

  @Column({ name: 'start_date', type: 'date', nullable: true })
  startDate: Date;

  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate: Date;

  @ManyToOne(() => Ordinator, ordinator => ordinator.supervisors, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ordinator_id' })
  ordinator: Ordinator;
}