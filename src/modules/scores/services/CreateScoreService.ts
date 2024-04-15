import { injectable, inject } from 'tsyringe';
import { uuid } from 'uuidv4';

import IScoresRepository from '../repositories/IScoresRepository';
import Score from '../infra/typeorm/entities/Score';
import IMarkingsRepository from '@modules/markings/repositories/IMarkingsRepository';
import AppError from '@shared/errors/AppError';
import Marking from '@modules/markings/infra/typeorm/entities/Marking';

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
  type: string;
  nfe: string;
  name?: string;
  lote?: string;
  markings?: Marking[];
  farm_id_sender?: string;
  farm_id_received?: string;
  farm_id_internal?: string;
  producer_id_sender?: string;
  producer_id_received?: string;
  producer_id_internal?: string;
}

@injectable()
class CreateScoreService {
  constructor(
    @inject('ScoresRepository')
    private scoresRepository: IScoresRepository,

    @inject('MarkingsRepository')
    private markingsRepository: IMarkingsRepository,
  ) {}

  public async execute(data: ICreateAll): Promise<Score> {
    const scoreExistent = await this.scoresRepository.findById(data.id);

    if (scoreExistent) {
      await this.scoresRepository.delete(scoreExistent.id);
    }

    const score = await this.scoresRepository.create(data);

    // const markings = await this.markingsRepository.findAllByScoreId(score.id);

    if (score.markings.length > 0) {
      await this.markingsRepository.createAll(score.markings);

      return score;
    }

    return score;
  }
}

export default CreateScoreService;
