import { getRepository, Repository } from 'typeorm';

import IProducersTokensRepository from '@modules/producers/repositories/IProducersTokensRepository';
import ProducerToken from '@modules/producers/infra/typeorm/entities/ProducerToken';
import ICreateProducerTokenDTO from '@modules/producers/dtos/ICreateProducerTokenDTO';

class ProducersTokensRepository implements IProducersTokensRepository {
  private ormRepository: Repository<ProducerToken>;

  constructor() {
    this.ormRepository = getRepository(ProducerToken);
  }

  public async findById(id: string): Promise<ProducerToken | undefined> {
    const producer = await this.ormRepository.findOne({ id });

    return producer;
  }

  public async findByProducerId(
    producer_id: string,
  ): Promise<ProducerToken | undefined> {
    const producer = await this.ormRepository.findOne({ producer_id });

    return producer;
  }

  public async findByProducerIdAndRefreshToken(
    producer_id: string,
    refresh_token: string,
  ): Promise<ProducerToken | undefined> {
    const producersTokens = await this.ormRepository.findOne({
      producer_id,
      refresh_token,
    });

    return producersTokens;
  }

  public async create(data: ICreateProducerTokenDTO): Promise<ProducerToken> {
    const producer = this.ormRepository.create(data);

    await this.ormRepository.save(producer);

    return producer;
  }

  public async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default ProducersTokensRepository;
