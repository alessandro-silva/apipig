import { injectable, inject } from 'tsyringe';

import dayjs from 'dayjs';
import { sign, verify } from 'jsonwebtoken';
import auth from '@config/auth';
import AppError from '@shared/errors/AppError';
import IProducersTokensRepository from '../repositories/IProducersTokensRepository';

interface IPayload {
  sub: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenService {
  constructor(
    @inject('ProducersTokensRepository')
    private producersTokensRepository: IProducersTokensRepository,
  ) {}

  public async execute(id: string): Promise<ITokenResponse> {
    const producerToken = await this.producersTokensRepository.findById(id);

    if (!producerToken) {
      throw new AppError('Refresh Token does not exists!', 401);
    }

    const { sub } = verify(
      producerToken.refresh_token,
      auth.jwt.secretRefreshTK,
    ) as IPayload;

    const producer_id = sub;

    await this.producersTokensRepository.deleteById(producerToken.id);

    const expires_date = dayjs()
      .add(auth.jwt.expiresInRefreshTKDays, 'days')
      .toDate();

    const refresh_token = sign({}, auth.jwt.secretRefreshTK, {
      subject: producer_id,
      expiresIn: auth.jwt.expiresInRefreshTK,
    });

    const newUserToken = await this.producersTokensRepository.create({
      producer_id,
      refresh_token,
      expires_date,
    });

    const newToken = sign({}, auth.jwt.secret, {
      subject: producer_id,
      expiresIn: auth.jwt.expiresIn,
    });

    return { token: newToken, refresh_token: newUserToken.id };
  }
}

export default RefreshTokenService;
