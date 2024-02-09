import ICreateProducerTokenDTO from '../dtos/ICreateProducerTokenDTO';
import ProducerToken from '../infra/typeorm/entities/ProducerToken';

export default interface IProducersTokensRepository {
  findById(id: string): Promise<ProducerToken | undefined>;
  findByProducerId(producer_id: string): Promise<ProducerToken | undefined>;
  create(data: ICreateProducerTokenDTO): Promise<ProducerToken>;
  findByProducerIdAndRefreshToken(
    producer_id: string,
    refresh_token: string,
  ): Promise<ProducerToken | undefined>;
  deleteById(id: string): Promise<void>;
}
