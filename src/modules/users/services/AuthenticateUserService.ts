import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import dayjs from 'dayjs';
import authConfig from '@config/auth';

import IUsersRepository from '../repositories/IUsersRepository';
import IUsersTokensRepository from '../repositories/IUsersTokensRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  cpf: string;
}

interface IResponse {
  user: User;
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
  ) {}

  public async execute({ cpf }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByCpf(cpf);

    if (!user) {
      throw new AppError('Incorrect nickname/password combination.', 401);
    }

    // if (!user.status) {
    //   throw new AppError('User this inative.', 401);
    // }

    const userToken = await this.usersTokensRepository.findByUserId(
      user.id,
    );

    if (userToken) {
      await this.usersTokensRepository.deleteById(userToken.id);
    }

    const {
      secret,
      expiresIn,
      secretRefreshTK,
      expiresInRefreshTK,
      expiresInRefreshTKDays,
    } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    const refresh_token = sign({}, secretRefreshTK, {
      subject: user.id,
      expiresIn: expiresInRefreshTK,
    });

    const expires_date = dayjs().add(expiresInRefreshTKDays, 'days').toDate();

    const refreshTokenCreated = await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date,
    });

    return {
      user,
      token,
      refresh_token: refreshTokenCreated.id,
    };
  }
}

export default AuthenticateUserService;
