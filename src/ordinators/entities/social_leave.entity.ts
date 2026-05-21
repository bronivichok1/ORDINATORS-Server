import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Ordinator } from './ordinators.entity';

@Entity('social_leaves')
export class SocialLeave {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'start_date', type: 'date', nullable: true })
  startDate: Date;

  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate: Date;

  @Column({ nullable: true })
  reason: string;

  @ManyToOne(() => Ordinator, ordinator => ordinator.socialLeaves, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ordinator_id' })
  ordinator: Ordinator;
}