import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IFarmsRepository from '../repositories/IFarmsRepository';
import Farm from '../infra/typeorm/entities/Farm';

interface IRequest {
  id: string;
  name?: string;
  nickname?: string;
  producer_id?: string;
}

@injectable()
class UpdateFarmService {
  constructor(
    @inject('FarmsRepository')
    private farmsRepository: IFarmsRepository,
  ) {}

  public async execute({
    id,
    name,
    nickname,
    producer_id,
  }: IRequest): Promise<Farm> {
    const farm = await this.farmsRepository.findById(id);

    if (!farm) {
      throw new AppError('Farm not exists.');
    }

    if (name) {
      farm.name = name;
    }

    if (nickname) {
      farm.nickname = nickname;
    }

    if (producer_id) {
      farm.producer_id = producer_id;
    }

    return this.farmsRepository.save(farm);
  }
}

export default UpdateFarmService;
