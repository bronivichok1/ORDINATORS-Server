import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Ordinator } from '../../ordinators/entities/ordinator.entity';

@Entity('education_info')
export class EducationInfo {
  @PrimaryGeneratedColumn()
  education_id: number;

  ordinators_id: number;

  @Column({ type: 'date', nullable: true })
  date_enrollment: string;

  @Column({ type: 'text', nullable: true })
  number_enrollment: string;

  @Column({ type: 'date', nullable: true })
  date_expulsion: string;

  @Column({ type: 'text', nullable: true })
  number_expulsion: string;

  @Column({ type: 'text', nullable: true })
  reason_expulsion: string;

  @ManyToOne(() => Ordinator, o => o.educationInfo)
@JoinColumn({ name: 'ordinators_id' })
ordinator: Ordinator;

}
