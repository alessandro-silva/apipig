import { getRepository, Repository } from 'typeorm';

import IFarmsTokensRepository from '@modules/farms/repositories/IFarmsTokensRepository';
import FarmToken from '@modules/farms/infra/typeorm/entities/FarmToken';
import ICreateFarmTokenDTO from '@modules/farms/dtos/ICreateFarmTokenDTO';

class FarmsTokensRepository implements IFarmsTokensRepository {
  private ormRepository: Repository<FarmToken>;

  constructor() {
    this.ormRepository = getRepository(FarmToken);
  }

  public async findById(id: string): Promise<FarmToken | undefined> {
    const farm = await this.ormRepository.findOne({ id });

    return farm;
  }

  public async findByFarmId(
    farm_id: string,
  ): Promise<FarmToken | undefined> {
    const farm = await this.ormRepository.findOne({ farm_id });

    return farm;
  }

  public async findByFarmIdAndRefreshToken(
    farm_id: string,
    refresh_token: string,
  ): Promise<FarmToken | undefined> {
    const farmsTokens = await this.ormRepository.findOne({
      farm_id,
      refresh_token,
    });

    return farmsTokens;
  }

  public async create(data: ICreateFarmTokenDTO): Promise<FarmToken> {
    const farm = this.ormRepository.create(data);

    await this.ormRepository.save(farm);

    return farm;
  }

  public async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default FarmsTokensRepository;
