import { injectable, inject } from 'tsyringe';

import dayjs from 'dayjs';
import { sign, verify } from 'jsonwebtoken';
import auth from '@config/auth';
import AppError from '@shared/errors/AppError';
import IFarmsTokensRepository from '../repositories/IFarmsTokensRepository';

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
    @inject('FarmsTokensRepository')
    private farmsTokensRepository: IFarmsTokensRepository,
  ) {}

  public async execute(id: string): Promise<ITokenResponse> {
    const farmToken = await this.farmsTokensRepository.findById(id);

    if (!farmToken) {
      throw new AppError('Refresh Token does not exists!', 401);
    }

    const { sub } = verify(
      farmToken.refresh_token,
      auth.jwt.secretRefreshTK,
    ) as IPayload;

    const farm_id = sub;

    await this.farmsTokensRepository.deleteById(farmToken.id);

    const expires_date = dayjs()
      .add(auth.jwt.expiresInRefreshTKDays, 'days')
      .toDate();

    const refresh_token = sign({}, auth.jwt.secretRefreshTK, {
      subject: farm_id,
      expiresIn: auth.jwt.expiresInRefreshTK,
    });

    const newUserToken = await this.farmsTokensRepository.create({
      farm_id,
      refresh_token,
      expires_date,
    });

    const newToken = sign({}, auth.jwt.secret, {
      subject: farm_id,
      expiresIn: auth.jwt.expiresIn,
    });

    return { token: newToken, refresh_token: newUserToken.id };
  }
}

export default RefreshTokenService;
