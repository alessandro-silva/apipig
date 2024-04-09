import { injectable, inject } from 'tsyringe';

import IFarmsRepository from '../repositories/IFarmsRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class DeleteFarmService {
  constructor(
    @inject('FarmsRepository')
    private farmsRepository: IFarmsRepository,
  ) {}

  public async execute(id: string): Promise<any> {
    const farm = await this.farmsRepository.findById(id);

    if (!farm) {
      throw new AppError('Farm does not exists.')
    }

    await this.farmsRepository.delete(id);

    return { message: 'Farm deleted.'}
  }
}

export default DeleteFarmService;
