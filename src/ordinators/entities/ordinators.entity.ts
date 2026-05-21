import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { University } from './university.entity';
import { CurrentControl } from './current_control.entity';
import { Money } from './money.entity';
import { Session } from './session.entity';
import { Vacation } from './vacation.entity';
import { EducationInfo } from './education_info.entity';
import { SocialLeave } from './social_leave.entity';
import { Supervisor } from './supervisors.entity';

@Entity('ordinators')
export class Ordinator {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fio: string;

  @Column({ name: 'fio_en', nullable: true })
  fioEn: string;

  @Column({ name: 'birth_year', type: 'date', nullable: true })
  birthYear: Date;

  @Column({ length: 1 })
  gender: string;

  @Column()
  country: string;

  @Column({ name: 'enrollment_date', type: 'date', nullable: true })
  enrollmentDate: Date;

  @Column({ name: 'dismissal_date', type: 'date', nullable: true })
  dismissalDate: Date;

  @Column({ name: 'dismissal_reason', nullable: true })
  dismissalReason: string;

  @Column({ name: 'mobile_phone' })
  mobilePhone: string;

  @Column({ name: 'identity_document' })
  identityDocument: string;

  @Column({ name: 'document_number' })
  documentNumber: string;

  @Column({ name: 'residence_address' })
  residenceAddress: string;

  @Column({ name: 'registration_expiry', type: 'date', nullable: true })
  registrationExpiry: Date;

  @Column({ name: 'enrollment_order_number', nullable: true })
  enrollmentOrderNumber: string;

  @Column({ name: 'enrollment_order_date', type: 'date', nullable: true })
  enrollmentOrderDate: Date;

  @Column({ name: 'dismissal_order_number', nullable: true })
  dismissalOrderNumber: string;

  @Column({ name: 'dismissal_order_date', type: 'date', nullable: true })
  dismissalOrderDate: Date;

  @Column({ name: 'contract_info' })
  contractInfo: string;

  @Column({ name: 'medical_certificate' })
  medicalCertificate: string;

  @Column()
  login: string;

  @Column()
  password: string; 

  @Column({ name: 'ident_number', nullable: true })
  identNumber: string;

  @Column({ name: 'living_address', nullable: true })
  livingAddress: string;

  @Column({ name: 'rivsh_certificate' })
  rivshCertificate: string;

  @Column({ name: 'entry_by_invitation' })
  entryByInvitation: string;

  @Column({ name: 'distribution_info', nullable: true })
  distributionInfo: string;

  @OneToOne(() => University, university => university.ordinator, {
    cascade: true,
    eager: true
  })
  @JoinColumn({ name: 'university_id' })
  university: University;

  @OneToOne(() => CurrentControl, currentControl => currentControl.ordinator, {
    cascade: true,
    eager: true
  })
  @JoinColumn({ name: 'current_control_id' })
  currentControl: CurrentControl;

  @OneToOne(() => Money, money => money.ordinator, {
    cascade: true,
    eager: true
  })
  @JoinColumn({ name: 'money_id' })
  money: Money;

  @OneToOne(() => Session, session => session.ordinator, {
    cascade: true,
    eager: true
  })
  @JoinColumn({ name: 'session_id' })
  session: Session;

  @OneToOne(() => Vacation, vacation => vacation.ordinator, {
    cascade: true,
    eager: true
  })
  @JoinColumn({ name: 'vacation_id' })
  vacation: Vacation;

  @OneToOne(() => EducationInfo, educationInfo => educationInfo.ordinator, {
    cascade: true,
    eager: true
  })
  @JoinColumn({ name: 'education_info_id' })
  educationInfo: EducationInfo;

  @OneToMany(() => SocialLeave, socialLeave => socialLeave.ordinator, {
    cascade: true,
    eager: true
  })
  socialLeaves: SocialLeave[];

  @OneToMany(() => Supervisor, supervisor => supervisor.ordinator, {
    cascade: true,
    eager: true
  })
  supervisors: Supervisor[];
}