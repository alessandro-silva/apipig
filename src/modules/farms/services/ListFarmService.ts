import { injectable, inject } from 'tsyringe';

import IFarmsRepository from '../repositories/IFarmsRepository';
import Farm from '../infra/typeorm/entities/Farm';

@injectable()
class ListFarmService {
  constructor(
    @inject('FarmsRepository')
    private farmsRepository: IFarmsRepository,
  ) {}

  public async execute(): Promise<Farm[]> {
    const farms = await this.farmsRepository.findAll();

    return farms;
  }
}

export default ListFarmService;
