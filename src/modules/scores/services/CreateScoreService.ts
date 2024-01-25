import { injectable, inject } from 'tsyringe';
import { uuid } from 'uuidv4';

import IScoresRepository from '../repositories/IScoresRepository';
import Score from '../infra/typeorm/entities/Score';
import IMarkingsRepository from '@modules/markings/repositories/IMarkingsRepository';

// interface IRequest {
//   id: string;
//   quantity: number;
//   weight: string;
//   file: string;
//   status: boolean;
//   start_date: Date;
//   end_date: Date;
//   created_at: Date;
//   updated_at: Date;
// }

@injectable()
class CreateScoreService {
  constructor(
    @inject('ScoresRepository')
    private scoresRepository: IScoresRepository,

    @inject('MarkingsRepository')
    private markingsRepository: IMarkingsRepository,
  ) {}

  public async execute(data: Score): Promise<Score> {
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
