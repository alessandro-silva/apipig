import { injectable, inject } from 'tsyringe';

import IScoresRepository from '../repositories/IScoresRepository';
import Score from '../infra/typeorm/entities/Score';

@injectable()
class ListScoreService {
  constructor(
    @inject('ScoresRepository')
    private scoresRepository: IScoresRepository,
  ) {}

  public async execute(): Promise<Score[]> {
    const scores = await this.scoresRepository.findAll();

    return scores;
  }
}

export default ListScoreService;
