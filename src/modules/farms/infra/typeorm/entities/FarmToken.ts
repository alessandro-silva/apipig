import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('farms_tokens')
class FarmToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  refresh_token: string;

  @Column()
  farm_id: string;

  @Column()
  expires_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default FarmToken;
