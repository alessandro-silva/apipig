import Marking from '@modules/markings/infra/typeorm/entities/Marking';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @OneToMany(() => Marking, marking => marking.score, {
    eager: true,
  })
  @JoinTable()
  markings: Marking[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Score;
