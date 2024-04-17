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
  progress?: string;
  lote?: string;
  file_url?: string;
  markings?: Marking[];
  farm_id_sender?: string;
  farm_id_received?: string;
  farm_id_internal?: string;
  producer_id_sender?: string;
  producer_id_received?: string;
  producer_id_internal?: string;
}

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
class CreateScoreService {
  constructor(
    @inject('ScoresRepository')
    private scoresRepository: IScoresRepository,

    @inject('MarkingsRepository')
    private markingsRepository: IMarkingsRepository,
  ) { }

  public async execute(data: ICreateAll): Promise<Score | void> {
    const scoreExistent = await this.scoresRepository.findById(data.id);

    if (scoreExistent) {
      await this.scoresRepository.delete(scoreExistent.id);
    }

    const scoreRecordFile = await fetch('http://167.71.20.221:82/terraform/v1/hooks/record/files', {
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

    const response = scoreRecordFile.data.filter((response: IStream) => {
      return response.stream === data.id;
    })

    // se happening estava streaming se não not found
    if (response.length = 1 && data.progress === 'happening') {
      data.file_url = `${process.env.AWS_BUCKET_URL}/${response[0].uuid}.mp4`
      data.progress = 'finalized';

      const score = await this.scoresRepository.create(data);

      if (score.markings.length > 0) {
        await this.markingsRepository.createAll(score.markings);

        return score;
      }

      return score;
    }

    if (response.length = 1 && data.progress !== 'finalized') {
      data.file_url = 'not_found';
      data.progress = 'not_found';

      const score = await this.scoresRepository.create(data);

      if (score.markings.length > 0) {
        await this.markingsRepository.createAll(score.markings);

        return score;
      }

      return score;
    }
  }
}

export default CreateScoreService;
