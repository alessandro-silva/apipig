import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('producers_tokens')
class ProducerToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  refresh_token: string;

  @Column()
  producer_id: string;

  @Column()
  expires_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ProducerToken;
