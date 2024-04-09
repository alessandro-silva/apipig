import { injectable, inject } from 'tsyringe';

import IProducersRepository from '../repositories/IProducersRepository';
import Producer from '../infra/typeorm/entities/Producer';

interface IRequest {
  name: string;
  cpf: string;
  internal_code: string;
  email: string;
}

@injectable()
class CreateProducerService {
  constructor(
    @inject('ProducersRepository')
    private producersRepository: IProducersRepository,
  ) { }

  public async execute({
    name,
    cpf,
    internal_code,
    email,
  }: IRequest): Promise<Producer> {
    const producer = await this.producersRepository.create({
      name,
      cpf,
      internal_code,
      email,
    });

    return producer;
  }
}

export default CreateProducerService;
