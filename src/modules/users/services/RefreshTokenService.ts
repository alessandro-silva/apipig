import { injectable, inject } from 'tsyringe';

import dayjs from 'dayjs';
import { sign, verify } from 'jsonwebtoken';
import auth from '@config/auth';
import AppError from '@shared/errors/AppError';
import IUsersTokensRepository from '../repositories/IUsersTokensRepository';

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
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
  ) {}

  public async execute(id: string): Promise<ITokenResponse> {
    const userToken = await this.usersTokensRepository.findById(id);

    if (!userToken) {
      throw new AppError('Refresh Token does not exists!', 401);
    }

    const { sub } = verify(
      userToken.refresh_token,
      auth.jwt.secretRefreshTK,
    ) as IPayload;

    const user_id = sub;

    await this.usersTokensRepository.deleteById(userToken.id);

    const expires_date = dayjs()
      .add(auth.jwt.expiresInRefreshTKDays, 'days')
      .toDate();

    const refresh_token = sign({}, auth.jwt.secretRefreshTK, {
      subject: user_id,
      expiresIn: auth.jwt.expiresInRefreshTK,
    });

    const newUserToken = await this.usersTokensRepository.create({
      user_id,
      refresh_token,
      expires_date,
    });

    const newToken = sign({}, auth.jwt.secret, {
      subject: user_id,
      expiresIn: auth.jwt.expiresIn,
    });

    return { token: newToken, refresh_token: newUserToken.id };
  }
}

export default RefreshTokenService;
