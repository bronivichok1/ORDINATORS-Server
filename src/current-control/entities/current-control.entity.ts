import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Ordinator } from '../../ordinators/entities/ordinator.entity';

@Entity('current_control')
export class CurrentControl {
  @PrimaryGeneratedColumn()
  control_id: number;

  @Column({ type: 'date' })
  control_date: string;

  @Column({ type: 'text', nullable: true })
  result: string;

  @ManyToOne(() => Ordinator, o => o.currentControls, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ordinators_id' })
  ordinator: Ordinator;
}

