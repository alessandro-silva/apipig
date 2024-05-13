import { injectable, inject } from 'tsyringe';

import IScoresRepository from '../repositories/IScoresRepository';
import AppError from '@shared/errors/AppError';

interface IStream {
  app: string,
  duration: number,
  nn: number,
  progress: boolean,
  size: number,
  stream: string,
  update: string,
  uuid: string,
  vhost: string
}

@injectable()
class ValidateScoreService {
  constructor(
    @inject('ScoresRepository')
    private scoresRepository: IScoresRepository,
  ) { }

  public async execute(): Promise<any | void> {
    let retries = 0;
    const maxRetries = 12;

    while (retries < maxRetries) {
      try {
        const records = await fetch('http://167.71.20.221:82/terraform/v1/hooks/record/files', {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer srs-v2-3a78d2ce88624a8f918a1fb93c388aa7"
          },
        }).then(async (response) => {
          return response.json();
        }).catch(err => {
          throw new AppError(err.message)
        });

        const recordsTrue: IStream[] = records.data.filter((record: IStream) => record.progress === true);

        if (recordsTrue.length > 0) {
          const scoresWithLinkStream = await Promise.all(
            recordsTrue.map(async record => {

              const score = await this.scoresRepository.findById(record.stream);

              if (!score) {
                throw new AppError('Score does not exists.')
              }

              if (score.progress === 'happening' || score.progress === 'finalized') {
                // throw new AppError('Score progress happening')
                return;
              }

              score.file_url = `http://167.71.20.221:82/live/${score.id}.flv`
              score.progress = 'happening';

              await this.scoresRepository.save(score);

              return { scoreHappening: true }
            })
          );

          return scoresWithLinkStream
        }

      } catch (error: any) {
        console.error(error.message);
      }

      retries++;
      if (retries < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 5000)); // Espera 5 segundos antes de tentar novamente
      }
    }

    return;
  }
}

export default ValidateScoreService;
