import { Expose } from 'class-transformer';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Farm from '@modules/farms/infra/typeorm/entities/Farm';
import Producer from '@modules/producers/infra/typeorm/entities/Producer';
import Marking from '@modules/markings/infra/typeorm/entities/Marking';

@Entity('scores')
class Score {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @Column()
  weight: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  status: boolean;

  @Column()
  type: string;

  @Column()
  nfe: string;

  @OneToMany(() => Marking, marking => marking.score, {
    eager: true,
  })
  @JoinTable()
  markings: Marking[];

  @Column()
  farm_id_sender: string;

  @ManyToOne(() => Farm, { eager: true })
  @JoinColumn({ name: 'farm_id_sender' })
  farmSender: Farm;

  @Column()
  farm_id_received: string;

  @ManyToOne(() => Farm, { eager: true })
  @JoinColumn({ name: 'farm_id_received' })
  farmReceived: Farm;

  @Column()
  farm_id_internal: string;

  @ManyToOne(() => Farm, { eager: true })
  @JoinColumn({ name: 'farm_id_internal' })
  farmInternal: Farm;

  @Column()
  producer_id_sender: string;

  @ManyToOne(() => Producer, { eager: true })
  @JoinColumn({ name: 'producer_id_sender' })
  producerSender: Producer;

  @Column()
  producer_id_received: string;

  @ManyToOne(() => Producer, { eager: true })
  @JoinColumn({ name: 'producer_id_received' })
  producerReceived: Producer;

  @Column()
  producer_id_internal: string;

  @ManyToOne(() => Producer, { eager: true })
  @JoinColumn({ name: 'producer_id_internal' })
  producerInternal: Producer;

  @Column()
  file: string;

  @Expose({ name: 'file_url' })
  file_url(): string {
    switch (process.env.STORAGE_DRIVER) {
      case 'disk':
        return `${process.env.APP_API_URL}/scores/file/${this.file}`;
      case 's3':
        return `${process.env.AWS_BUCKET_URL}/scores/file/${this.file}`;
      default:
        return '';
    }
  }

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Score;
