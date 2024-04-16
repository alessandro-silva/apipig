import { injectable, inject } from 'tsyringe';

import IScoresRepository from '../repositories/IScoresRepository';

import IFindAllFilters from '../dtos/IFindAllFiltersDTO';
import Score from '../infra/typeorm/entities/Score';
// import IScoreResponseDTO from '../dtos/IScoreResponseDTO';
// import { ScoreMap } from '../mapper/ScoreMap';

interface IResponseFilters {
  scores: Score[];
  pagination: {
    page: number;
    take: number;
    total: number;
    totalPages: number;
  };
}

@injectable()
class FilterServiceScoreService {
  constructor(
    @inject('ScoresRepository')
    private scoresRepository: IScoresRepository,
  ) {}

  // eslint-disable-next-line consistent-return
  public async execute({
    type,
    farm_id_internal,
    producer_id_internal,
    farm_id_received,
    producer_id_received,
    farm_id_sender,
    producer_id_sender,
    created_at,
    take,
    page,
  }: IFindAllFilters): Promise<IResponseFilters | void> {
    const { scores, pagination } =
      await this.scoresRepository.findAllFilters({
        type,
        farm_id_internal,
        producer_id_internal,
        farm_id_received,
        producer_id_received,
        farm_id_sender,
        producer_id_sender,
        created_at,
        take,
        page: page - 1,
      });


    // const scoresResponse = scores.map(score => {
    //   return ScoreMap.toDTO(score);
    // });

    return { scores, pagination };
  }
}

export default FilterServiceScoreService;
