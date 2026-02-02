import { Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';

import { EducationInfo } from '../../education-info/entities/education-info.entity';
import { Money } from '../../money/entities/money.entity';
import { Session } from '../../session/entities/session.entity';
import { University } from '../../university/entities/university.entity';
import { Vacation } from '../../vacation/entities/vacation.entity';
import { CurrentControl } from '../../current-control/entities/current-control.entity';

@Entity('ordinators')
export class Ordinator {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: true })
  pasnumber: string;

  @Column({ type: 'varchar', length: 100 })
  lastname_ru: string;

  @Column({ type: 'varchar', length: 100 })
  firstname_ru: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  patronymic_ru?: string;

  @Column({ type: 'varchar', length: 100 })
  lastname_en: string;

  @Column({ type: 'varchar', length: 100 })
  firstname_en: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  patronymic_en?: string;

  @Column({ type: 'varchar', length: 100 })
  country: string;

  @Column({ type: 'date' })
  birth_date: string;

  @Column({ type: 'varchar', length: 10 })
  gender: string;

  @Column({ type: 'varchar', length: 20 })
  mobile: string;

  @Column({ type: 'varchar', length: 150 })
  email: string;

  @Column({ type: 'varchar', length: 50 })
  login: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'char', length: 1 })
  medicalcertificate: 'Y' | 'N';

  @Column({ type: 'char', length: 1 })
  rivshcertificate: 'Y' | 'N';

  @Column({ type: 'varchar', length: 50 })
  doc_type: string;

  @Column({ type: 'char', length: 1 })
  invite: 'Y' | 'N';

  @Column({ type: 'varchar', length: 50 })
  agreement: string;

  @Column({ type: 'varchar', length: 50 })
  distribution: string;

  @Column({ type: 'varchar', length: 50 })
  teacher: string;

  @Column({ type: 'varchar', length: 255 })
  living_place: string;

  @Column({ type: 'date' })
  registration_deadline: string;
  
  @OneToMany(() => EducationInfo, e => e.ordinator, {
    cascade : true,
  })
  educationInfo: EducationInfo[];

  @OneToMany(() => Money, m => m.ordinator, {
    cascade : true,
  })
  money: Money[];

  @OneToMany(() => Session, s => s.ordinator, {
    cascade : true,
  })
  sessions: Session[];

  @OneToMany(() => University, u => u.ordinator, {
    cascade : true,
  })
  universities: University[];

  @OneToMany(() => Vacation, v => v.ordinator, {
    cascade : true,
  })
  vacations: Vacation[];

  @OneToMany(() => CurrentControl, c => c.ordinator, {
    cascade : true,
  })
  currentControls: CurrentControl[];
}
