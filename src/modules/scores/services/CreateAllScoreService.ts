import { injectable, inject } from 'tsyringe';

import IScoresRepository from '../repositories/IScoresRepository';
import Score from '../infra/typeorm/entities/Score';

interface IRequest {
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

@injectable()
class CreateAllScoreService {
  constructor(
    @inject('ScoresRepository')
    private scoresRepository: IScoresRepository,
  ) {}

  public async execute(data: IRequest[]): Promise<any> {
    const scores = await this.scoresRepository.createAll(data);

    return scores;
  }
}

export default CreateAllScoreService;
