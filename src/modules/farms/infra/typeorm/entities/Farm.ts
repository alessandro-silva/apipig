import Producer from '@modules/producers/infra/typeorm/entities/Producer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('farms')
class Farm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  nickname: string;

  @Column()
  status: boolean;

  @Column()
  producer_id: string;

  @ManyToOne(() => Producer, { eager: true })
  @JoinColumn({ name: 'producer_id' })
  producer: Producer;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Farm;
