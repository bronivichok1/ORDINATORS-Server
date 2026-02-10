import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Ordinator } from './ordinators.entity';

@Entity('university')
export class University {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'graduation_year', type: 'date', nullable: true })
  graduationYear: Date;

  @Column()
  department: string;

  @Column({ name: 'specialty_profile' })
  specialtyProfile: string;

  @Column()
  specialty: string;

  @Column({ name: 'preparation_form' })
  preparationForm: string;

  @OneToOne(() => Ordinator, ordinator => ordinator.university)
  ordinator: Ordinator;
}