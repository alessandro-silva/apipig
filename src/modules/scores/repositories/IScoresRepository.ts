import Score from '../infra/typeorm/entities/Score';
import { DeleteResult } from 'typeorm';

interface ICreateAll {
  id: string;
  quantity: number;
  weight: string;
  file: string;
  status: boolean;
  start_date: Date;
  end_date: Date;
  created_at: Date;
  updated_at: Date;
}

export default interface IScoresRepository {
  findAll(): Promise<Score[]>;
  findById(id: string): Promise<Score | undefined>;
  findByProducerId(producer_id: string): Promise<Score[]>;
  findByStatus(status: boolean): Promise<Score[]>;
  create(data: ICreateAll): Promise<Score>;
  createAll(data: ICreateAll[]): Promise<Score[]>;
  save(score: Score): Promise<Score>;
  delete(id: string): Promise<DeleteResult>;
}
