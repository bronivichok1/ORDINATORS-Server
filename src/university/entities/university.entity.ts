import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Ordinator } from '../../ordinators/entities/ordinator.entity';

@Entity('university')
export class University {
  @PrimaryGeneratedColumn()
  university_id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'date', nullable: true })
  graduation_year: string;

  @Column({ type: 'text', nullable: true })
  department: string;

  @Column({ type: 'text', nullable: true })
  profile: string;

  @Column({ type: 'text', nullable: true })
  speciality: string;

  @Column({ type: 'text', nullable: true })
  education_form: string;

  @ManyToOne(() => Ordinator, o => o.universities, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ordinators_id' })
  ordinator: Ordinator;
}