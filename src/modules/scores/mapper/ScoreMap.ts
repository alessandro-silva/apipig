import { classToClass } from 'class-transformer';

import IScoreResponseDTO from '../dtos/IScoreResponseDTO';
import Score from '../infra/typeorm/entities/Score';

// eslint-disable-next-line import/prefer-default-export
export class ScoreMap {
  static toDTO({
    id,
    weight,
    quantity,
    start_date,
    end_date,
    status,
    file,
    file_url,
    nfe,
    type,
    markings,
    farmInternal,
    farmReceived,
    farmSender,
    farm_id_internal,
    farm_id_received,
    farm_id_sender,
    producerInternal,
    producerReceived,
    producerSender,
    producer_id_internal,
    producer_id_received,
    producer_id_sender,
  }: Score): IScoreResponseDTO {
    const score = classToClass({
      id,
      weight,
      quantity,
      start_date,
      end_date,
      status,
      file,
      file_url,
      nfe,
      type,
      markings,
      farmInternal,
      farmReceived,
      farmSender,
      farm_id_internal,
      farm_id_received,
      farm_id_sender,
      producerInternal,
      producerReceived,
      producerSender,
      producer_id_internal,
      producer_id_received,
      producer_id_sender,
    });

    return score;
  }
}
