import { injectable, inject } from 'tsyringe';
import { differenceInMinutes, minutesToHours } from 'date-fns';

import IScoresRepository from '../repositories/IScoresRepository';
import AppError from '@shared/errors/AppError';
// import { ScoreMap } from '../mapper/ScoreMap';

interface IRequest {
  id?: string;
  producer_id?: string;
}

@injectable()
class ShowScoreService {
  constructor(
    @inject('ScoresRepository')
    private scoresRepository: IScoresRepository,
  ) {}

  public async execute({ id, producer_id }: IRequest): Promise<any> {
    if (id) {
      const score = await this.scoresRepository.findById(id);

      if (!score) {
        throw new AppError('Score does not exists.')
      }

      const duration = differenceInMinutes(score.end_date, score.start_date);

      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;

      // const scoreMap = ScoreMap.toDTO(score);

      return {...score, duration: { hours,minutes } };
    }

    // if (producer_id) {
    //   const scores = await this.scoresRepository.findByProducerId(producer_id);

    //   return scores;
    // }
  }
}

export default ShowScoreService;
