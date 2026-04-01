import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index } from 'typeorm';

@Entity('logs')
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  @Index()
  userId: number;

  @Column({ nullable: true, length: 255 })
  userFio: string;

  @Column({ nullable: true, length: 50 })
  @Index()
  userRole: string;

  @Column({ length: 100 })
  @Index()
  actionType: string;

  @Column({ type: 'text', nullable: true })
  details: string; 

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  targetInfo: string;

  @CreateDateColumn()
  @Index()
  timestamp: Date;

  @Column({ length: 50, nullable: true })
  ipAddress: string;
}