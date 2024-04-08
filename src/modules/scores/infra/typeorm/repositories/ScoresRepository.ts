import { DeleteResult, getRepository, Repository } from 'typeorm';

import IScoresRepository from '@modules/scores/repositories/IScoresRepository';
import ICreateScoreDTO from '@modules/scores/dtos/ICreateScoreDTO';

import Score from '@modules/scores/infra/typeorm/entities/Score';

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
  producer_id: string;
  type: string;
  nfe: string;
  farm_id: string;
}

class ScoresRepository implements IScoresRepository {
  private ormRepository: Repository<Score>;

  constructor() {
    this.ormRepository = getRepository(Score);
  }

  public async findAll(): Promise<Score[]> {
    const scores = await this.ormRepository.find();

    return scores;
  }

  public async findById(id: string): Promise<Score | undefined> {
    const score = await this.ormRepository.findOne({
      where: { id },
    });

    return score;
  }

  public async findByProducerId(producer_id: string): Promise<Score[]> {
    const scores = await this.ormRepository.find({
      where: { producer_id },
    });

    return scores;
  }

  public async findByStatus(status: boolean): Promise<Score[]> {
    const scores = await this.ormRepository.find({
      where: { status },
    });

    return scores;
  }

  public async create(data: ICreateAll): Promise<Score> {
    const score = this.ormRepository.create(data);

    await this.ormRepository.save(score);

    return score;
  }

  public async createAll(data: ICreateAll[]): Promise<Score[]> {
    const scores = this.ormRepository.create(data);

    await this.ormRepository.save(scores);

    return scores;
  }

  public async save(score: Score): Promise<Score> {
    return this.ormRepository.save(score);
  }

  public async delete(id: string): Promise<DeleteResult> {
    return this.ormRepository.delete({ id });
  }
}

export default ScoresRepository;
