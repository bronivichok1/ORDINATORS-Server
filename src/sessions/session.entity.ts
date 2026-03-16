import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('sessions')
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  @Index()
  sid: string;

  @Column({ type: 'jsonb' })
  sess: any;

  @Column({ type: 'timestamp' })
  @Index()
  expire: Date;

  @Column({ nullable: true })
  userId: number;

  @Column({ nullable: true, length: 255 })
  userFio: string;

  @Column({ nullable: true, length: 50 })
  userRole: string;
}