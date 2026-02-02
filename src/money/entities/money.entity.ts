import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Ordinator } from '../../ordinators/entities/ordinator.entity';

@Entity('money')
export class Money {
  @PrimaryGeneratedColumn()
  money_id: number;

  @Column({ type: 'date', nullable: true })
  start: string;

  @Column({ type: 'date', nullable: true })
  end: string;

  @ManyToOne(() => Ordinator, o => o.money, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ordinators_id' })
  ordinator: Ordinator;
}
