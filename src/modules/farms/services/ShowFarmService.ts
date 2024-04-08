import { injectable, inject } from 'tsyringe';

import IFarmsRepository from '../repositories/IFarmsRepository';
import Farm from '../infra/typeorm/entities/Farm';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id?: string;
  producer_id?: string;
}

@injectable()
class ShowFarmService {
  constructor(
    @inject('FarmsRepository')
    private farmsRepository: IFarmsRepository,
  ) {}

  public async execute({ id, producer_id }: IRequest): Promise<Farm[] | Farm | void> {
    if (id) {
      const farm = await this.farmsRepository.findById(id);

      if (!farm) {
        throw new AppError('Farm does not exists.');
      }

      return farm;
    }

    if (producer_id) {
      const farms = await this.farmsRepository.findAllByProducerId(producer_id);

      return farms;
    }
  }
}

export default ShowFarmService;
