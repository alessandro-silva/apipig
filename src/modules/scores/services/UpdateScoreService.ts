import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IScoresRepository from '../repositories/IScoresRepository';
import Score from '../infra/typeorm/entities/Score';

interface IRequest {
  id: string;
  quantity?: number;
  weight?: string;
}

@injectable()
class UpdateScoreService {
  constructor(
    @inject('ScoresRepository')
    private scoresRepository: IScoresRepository,
  ) {}

  public async execute({
    id,
    quantity,
    weight,
  }: IRequest): Promise<Score> {
    const score = await this.scoresRepository.findById(id);

    if (!score) {
      throw new AppError('Score not exists.');
    }

    if (quantity) {
      score.quantity = quantity;
    }

    if (weight) {
      score.weight = weight;
    }

    return this.scoresRepository.save(score);
  }
}

export default UpdateScoreService;
