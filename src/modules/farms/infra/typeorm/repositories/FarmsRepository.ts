import { DeleteResult, getRepository, Repository } from 'typeorm';

import IFarmsRepository from '@modules/farms/repositories/IFarmsRepository';
import ICreateFarmDTO from '@modules/farms/dtos/ICreateFarmDTO';
import Farm from '@modules/farms/infra/typeorm/entities/Farm';

class FarmsRepository implements IFarmsRepository {
  private ormRepository: Repository<Farm>;

  constructor() {
    this.ormRepository = getRepository(Farm);
  }

  public async findAll(): Promise<Farm[]> {
    const farms = await this.ormRepository.find();

    return farms;
  }

  public async findAllByProducerId(producer_id: string): Promise<Farm[]> {
    const farms = await this.ormRepository.find({
      where: { producer_id }
    });

    return farms;
  }

  public async findById(id: string): Promise<Farm | undefined> {
    const farm = await this.ormRepository.findOne({
      where: { id },
    });

    return farm;
  }

  public async findByNickname(nickname: string): Promise<Farm | undefined> {
    const farm = await this.ormRepository.findOne({
      where: { nickname },
    });

    return farm;
  }

  public async create(data: ICreateFarmDTO): Promise<Farm> {
    const farm = this.ormRepository.create(data);

    await this.ormRepository.save(farm);

    return farm;
  }

  public async createAll(data: ICreateFarmDTO[]): Promise<Farm[]> {
    const farms = this.ormRepository.create(data);

    await this.ormRepository.save(farms);

    return farms;
  }

  public async save(farm: Farm): Promise<Farm> {
    return this.ormRepository.save(farm);
  }

  public async delete(id: string): Promise<DeleteResult> {
    return this.ormRepository.delete({ id });
  }
}

export default FarmsRepository;
