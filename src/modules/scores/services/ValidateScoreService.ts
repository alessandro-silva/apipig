import { injectable, inject } from 'tsyringe';

import IScoresRepository from '../repositories/IScoresRepository';
import Score from '../infra/typeorm/entities/Score';
import AppError from '@shared/errors/AppError';

@injectable()
class ValidateScoreService {
  constructor(
    @inject('ScoresRepository')
    private scoresRepository: IScoresRepository,
  ) { }

  public async execute(): Promise<any> {

    // const scoreRecordFile = await fetch('http://167.71.20.221:82/terraform/v1/hooks/record/files', {
    //   method: 'GET',
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": "Bearer srs-v2-3a78d2ce88624a8f918a1fb93c388aa7"
    //   },
    // }).then(async (response) => {
    //   return response.json();
    // }).catch(err => {
    //   throw new AppError(err.message)
    // });
  }
}

export default ValidateScoreService;
