import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IScoresRepository from '../repositories/IScoresRepository';
import Score from '../infra/typeorm/entities/Score';

interface IRequest {
  id: string;
  quantity?: number;
  weight?: string;
  start_date?: Date;
  end_date?: Date;
  status?: boolean;
  type?: string;
  nfe?: string;
  name?: string;
  lote?: string;
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
  progress: true,
  size: number,
  stream: string,
  update: string,
  uuid: string,
  vhost: string
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
    start_date,
    end_date,
    status,
    name,
    lote,
    nfe,
    type,
    farm_id_internal,
    farm_id_received,
    farm_id_sender,
    producer_id_internal,
    producer_id_received,
    producer_id_sender,
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

    if (start_date) {
      score.start_date = start_date;
    }

    if (status === true) {
      score.status = true;
    }

    if (status === false) {
      score.status = false;
    }

    if (name) {
      score.name = name;
    }

    if (lote) {
      score.lote = lote;
    }

    if (nfe) {
      score.nfe = nfe;
    }

    if (type) {
      score.type = type;
    }

    if (farm_id_internal) {
      score.farm_id_internal = farm_id_internal;
    }

    if (farm_id_received) {
      score.farm_id_received = farm_id_received;
    }

    if (farm_id_sender) {
      score.farm_id_sender = farm_id_sender;
    }

    if (producer_id_internal) {
      score.producer_id_internal = producer_id_internal;
    }

    if (producer_id_received) {
      score.producer_id_received = producer_id_received;
    }

    if (producer_id_sender) {
      score.producer_id_sender = producer_id_sender;
    }

    if (end_date) {
      score.end_date = end_date;

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
        return response.stream === score.id;
      })

      console.log('response', response)

      if (response.length > 0 && score.progress === 'happening') {
        score.file_url = `${process.env.AWS_BUCKET_URL}/${response[0].uuid}.mp4`
        score.progress = 'finalized';

        console.log('finalized', score.progress)

        const scoreSaved = await this.scoresRepository.save(score);

        // if (score.markings.length > 0) {
        //   await this.markingsRepository.createAll(score.markings);

        //   return score;
        // }

        const finalized = await fetch(`http://167.71.20.221:82/terraform/v1/hooks/record/end`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer srs-v2-3a78d2ce88624a8f918a1fb93c388aa7"
          },
          body: JSON.stringify({ uuid: `${response[0].uuid}` }),
        }).then(async (response) => {
          return response.json();
        }).catch(err => {
          throw new AppError(err.message)
        });

        console.log('finalizedRecord', finalized)

        return scoreSaved;
      }

    }

    return this.scoresRepository.save(score);
  }
}

export default UpdateScoreService;
