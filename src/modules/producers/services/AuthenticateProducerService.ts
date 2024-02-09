import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import dayjs from 'dayjs';
import authConfig from '@config/auth';
import IProducersRepository from '../repositories/IProducersRepository';
import IProducersTokensRepository from '../repositories/IProducersTokensRepository';
import Producer from '../infra/typeorm/entities/Producer';

interface IRequest {
  cpf: string;
}

interface IResponse {
  producer: Producer;
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateProducerService {
  constructor(
    @inject('ProducersRepository')
    private producersRepository: IProducersRepository,

    @inject('ProducersTokensRepository')
    private producersTokensRepository: IProducersTokensRepository,
  ) {}

  public async execute({ cpf }: IRequest): Promise<IResponse> {
    const producer = await this.producersRepository.findByCpf(cpf);

    if (!producer) {
      throw new AppError('Incorrect nickname/password combination.', 401);
    }

    const producerToken = await this.producersTokensRepository.findByProducerId(
      producer.id,
    );

    if (producerToken) {
      await this.producersTokensRepository.deleteById(producerToken.id);
    }

    const {
      secret,
      expiresIn,
      secretRefreshTK,
      expiresInRefreshTK,
      expiresInRefreshTKDays,
    } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: producer.id,
      expiresIn,
    });

    const refresh_token = sign({}, secretRefreshTK, {
      subject: producer.id,
      expiresIn: expiresInRefreshTK,
    });

    const expires_date = dayjs().add(expiresInRefreshTKDays, 'days').toDate();

    const refreshTokenCreated = await this.producersTokensRepository.create({
      producer_id: producer.id,
      refresh_token,
      expires_date,
    });

    return {
      producer,
      token,
      refresh_token: refreshTokenCreated.id,
    };
  }
}

export default AuthenticateProducerService;
