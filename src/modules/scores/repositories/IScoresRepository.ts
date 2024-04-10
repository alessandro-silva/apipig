import IFindAllFilters from '../dtos/IFindAllFiltersDTO';
import Score from '../infra/typeorm/entities/Score';
import { DeleteResult } from 'typeorm';

interface ICreateAll {
  id?: string;
  quantity?: number;
  weight?: string;
  file?: string;
  status?: boolean;
  start_date?: Date;
  end_date?: Date;
  created_at?: Date;
  updated_at?: Date;
  type?: string;
  nfe?: string;
  farm_id_sender?: string;
  farm_id_received?: string;
  farm_id_internal?: string;
  producer_id_sender?: string;
  producer_id_received?: string;
  producer_id_internal?: string;
}

interface IResponseFilters {
  scores: Score[];
  pagination: {
    page: number;
    take: number;
    total: number;
    totalPages: number;
  };
}

export default interface IScoresRepository {
  findAllFilters(data: IFindAllFilters): Promise<IResponseFilters>;
  findAll(): Promise<Score[]>;
  findById(id: string): Promise<Score | undefined>;
  // findByProducerId(producer_id: string): Promise<Score[]>;
  findByStatus(status: boolean): Promise<Score[]>;
  create(data: ICreateAll): Promise<Score>;
  createAll(data: ICreateAll[]): Promise<Score[]>;
  save(score: Score): Promise<Score>;
  delete(id: string): Promise<DeleteResult>;
}
