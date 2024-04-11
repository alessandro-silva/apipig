import { DeleteResult, getRepository, Repository } from 'typeorm';

import IScoresRepository from '@modules/scores/repositories/IScoresRepository';
import ICreateScoreDTO from '@modules/scores/dtos/ICreateScoreDTO';

import Score from '@modules/scores/infra/typeorm/entities/Score';
import IFindAllFilters from '@modules/scores/dtos/IFindAllFiltersDTO';

interface ICreateAll {
  id?: string;
  quantity?: number;
  weight?: string;
  file?: string;
  status?: boolean;
  start_date?: Date;
  end_date?: Date;
  created_at?: Date;
  updated_at?: Date;
  type?: string;
  nfe?: string;
  farm_id_sender?: string;
  farm_id_received?: string;
  farm_id_internal?: string;
  producer_id_sender?: string;
  producer_id_received?: string;
  producer_id_internal?: string;
}

interface IResponseFilters {
  scores: Score[];
  pagination: {
    page: number;
    take: number;
    total: number;
    totalPages: number;
  };
}

class ScoresRepository implements IScoresRepository {
  private ormRepository: Repository<Score>;

  constructor() {
    this.ormRepository = getRepository(Score);
  }

  public async findAllFilters({
    type,
    farm_id_internal,
    producer_id_internal,
    farm_id_received,
    producer_id_received,
    farm_id_sender,
    producer_id_sender,
    take,
    page,
  }: IFindAllFilters): Promise<IResponseFilters> {
    const scoresQuery = await this.ormRepository
      .createQueryBuilder('score')
      .where('1=1')
      .take(take)
      .skip(page * take)
      .orderBy('score.created_at', 'DESC')
      .leftJoinAndSelect('score.farmSender', 'farmSender')
      .leftJoinAndSelect('score.farmReceived', 'farmReceived')
      .leftJoinAndSelect('score.farmInternal', 'farmInternal')
      .leftJoinAndSelect('score.markings', 'markings');

    if (type) {
      scoresQuery.andWhere(
        "UPPER(score.type) LIKE UPPER('%'||:type||'%' )",
        {
          type,
        },
      );
    }

    if (farm_id_internal) {
      scoresQuery.andWhere('score.farm_id_internal = :farm_id_internal', {
        farm_id_internal,
      });
    }

    if (producer_id_internal) {
      scoresQuery.andWhere('score.producer_id_internal = :producer_id_internal', {
        producer_id_internal,
      });
    }

    if (farm_id_received) {
      scoresQuery.andWhere('score.farm_id_received = :farm_id_received', {
        farm_id_received,
      });
    }

    if (producer_id_received) {
      scoresQuery.andWhere('score.producer_id_received = :producer_id_received', {
        producer_id_received,
      });
    }

    if (farm_id_sender) {
      scoresQuery.andWhere('score.farm_id_sender = :farm_id_sender', {
        farm_id_sender,
      });
    }

    if (producer_id_sender) {
      scoresQuery.andWhere('score.producer_id_sender = :producer_id_sender', {
        producer_id_sender,
      });
    }

    const [scores, total] = await scoresQuery.getManyAndCount();
    const totalPages = Math.ceil(total / take);

    return { scores, pagination: { page, take, total, totalPages } };
  }

  public async findAll(): Promise<Score[]> {
    const scores = await this.ormRepository.find();

    return scores;
  }

  public async findById(id: string): Promise<Score | undefined> {
    const score = await this.ormRepository.findOne({
      where: { id },
    });

    return score;
  }

  // public async findByProducerId(producer_id: string): Promise<Score[]> {
  //   const scores = await this.ormRepository.find({
  //     where: { producer_id },
  //   });

  //   return scores;
  // }

  public async findByStatus(status: boolean): Promise<Score[]> {
    const scores = await this.ormRepository.find({
      where: { status },
    });

    return scores;
  }

  public async create(data: ICreateAll): Promise<Score> {
    const score = this.ormRepository.create(data);

    await this.ormRepository.save(score);

    return score;
  }

  public async createAll(data: ICreateAll[]): Promise<Score[]> {
    const scores = this.ormRepository.create(data);

    await this.ormRepository.save(scores);

    return scores;
  }

  public async save(score: Score): Promise<Score> {
    return this.ormRepository.save(score);
  }

  public async delete(id: string): Promise<DeleteResult> {
    return this.ormRepository.delete({ id });
  }
}

export default ScoresRepository;
