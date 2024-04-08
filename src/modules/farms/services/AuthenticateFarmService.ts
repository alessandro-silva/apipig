import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import dayjs from 'dayjs';
import authConfig from '@config/auth';
import IFarmsRepository from '../repositories/IFarmsRepository';
import IFarmsTokensRepository from '../repositories/IFarmsTokensRepository';
import Farm from '../infra/typeorm/entities/Farm';

interface IRequest {
  nickname: string;
}

interface IResponse {
  farm: Farm;
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateFarmService {
  constructor(
    @inject('FarmsRepository')
    private farmsRepository: IFarmsRepository,

    @inject('FarmsTokensRepository')
    private farmsTokensRepository: IFarmsTokensRepository,
  ) {}

  public async execute({ nickname }: IRequest): Promise<IResponse> {
    const farm = await this.farmsRepository.findByNickname(nickname);

    if (!farm) {
      throw new AppError('Incorrect nickname/password combination.', 401);
    }

    const farmToken = await this.farmsTokensRepository.findByFarmId(
      farm.id,
    );

    if (farmToken) {
      await this.farmsTokensRepository.deleteById(farmToken.id);
    }

    const {
      secret,
      expiresIn,
      secretRefreshTK,
      expiresInRefreshTK,
      expiresInRefreshTKDays,
    } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: farm.id,
      expiresIn,
    });

    const refresh_token = sign({}, secretRefreshTK, {
      subject: farm.id,
      expiresIn: expiresInRefreshTK,
    });

    const expires_date = dayjs().add(expiresInRefreshTKDays, 'days').toDate();

    const refreshTokenCreated = await this.farmsTokensRepository.create({
      farm_id: farm.id,
      refresh_token,
      expires_date,
    });

    return {
      farm,
      token,
      refresh_token: refreshTokenCreated.id,
    };
  }
}

export default AuthenticateFarmService;
