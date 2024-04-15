import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  OneToMany,
} from 'typeorm';

import Farm from '@modules/farms/infra/typeorm/entities/Farm';

@Entity('producers')
class Producer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  email: string;

  @Column()
  internal_code: string;

  @OneToMany(() => Farm, marking => marking.producer)
  @JoinTable()
  farms: Farm[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Producer;
