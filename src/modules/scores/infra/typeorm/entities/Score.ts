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

import Marking from '@modules/markings/infra/typeorm/entities/Marking';
import Farm from '@modules/farms/infra/typeorm/entities/Farm';

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

  @Column()
  farm_id: string;

  @ManyToOne(() => Farm, { eager: true })
  @JoinColumn({ name: 'farm_id' })
  farm: Farm;

  @Column()
  producer_id: string;

  @OneToMany(() => Marking, marking => marking.score, {
    eager: true,
  })
  @JoinTable()
  markings: Marking[];

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
