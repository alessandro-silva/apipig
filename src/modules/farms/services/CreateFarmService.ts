import { injectable, inject } from 'tsyringe';

import IFarmsRepository from '../repositories/IFarmsRepository';
import Farm from '../infra/typeorm/entities/Farm';
import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string;
  nickname: string;
  producer_id: string;
}

@injectable()
class CreateFarmService {
  constructor(
    @inject('FarmsRepository')
    private farmsRepository: IFarmsRepository,
  ) {}

  public async execute({
    name,
    nickname,
    producer_id,
  }: IRequest): Promise<Farm> {
    const farmExists = await this.farmsRepository.findByNickname(nickname);

    if (farmExists) {
      throw new AppError('The farm nickname already exists.')
    }

    const farm = await this.farmsRepository.create({
      name,
      nickname,
      producer_id,
    });

    return farm;
  }
}

export default CreateFarmService;
