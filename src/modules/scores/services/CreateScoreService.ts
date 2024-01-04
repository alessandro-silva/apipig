import { injectable, inject } from 'tsyringe';

import IScoresRepository from '../repositories/IScoresRepository';
import Score from '../infra/typeorm/entities/Score';

interface IRequest {
  quantity: number;
  weight: string;
}

@injectable()
class CreateScoreService {
  constructor(
    @inject('ScoresRepository')
    private scoresRepository: IScoresRepository,
  ) {}

  public async execute({
    quantity,
    weight,
  }: IRequest): Promise<Score> {
    const score = await this.scoresRepository.create({
      quantity,
      weight,
    });

    return score;
  }
}

export default CreateScoreService;
