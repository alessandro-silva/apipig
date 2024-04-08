import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import UsersRepository from '../../typeorm/repositories/UsersRepository';
import ProducersRepository from '@modules/producers/infra/typeorm/repositories/ProducersRepository';
import FarmsRepository from '@modules/farms/infra/typeorm/repositories/FarmsRepository';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

// eslint-disable-next-line consistent-return
export default async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<any> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({
      error: true,
      code: 'token.invalid',
      message: 'Token not present.',
    });
  }

  const [, token] = authHeader.split(' ');

  if (!token) {
    return response.status(401).json({
      error: true,
      code: 'token.invalid',
      message: 'Token not present.',
    });
  }

  try {
    const { sub: user_id } = verify(
      token,
      authConfig.jwt.secret,
    ) as ITokenPayload;

    const usersRepository = new UsersRepository();
    const producersRepository = new ProducersRepository();
    const farmsRepository = new FarmsRepository();

    const user = await usersRepository.findById(user_id);
    const producer = await producersRepository.findById(user_id);
    const farm = await farmsRepository.findById(user_id);

    if (user) {
      request.user = {
        id: user_id,
      };

      return next();
    }

    if (producer) {
      request.producer = {
        id: user_id,
      };

      return next();
    }

    if (farm) {
      request.farm = {
        id: user_id,
      };

      return next();
    }

    return response.status(401).json({
      error: true,
      code: 'user.undefined',
      message: 'Use does not exists.',
    });
  } catch (err) {
    if (String(err) === 'JsonWebTokenError: jwt malformed')
      return response.status(401).json({
        error: true,
        code: 'token.malformed',
        message: 'Token Invalid.',
      });

    if (String(err) === 'TokenExpiredError: jwt expired')
      return response.status(401).json({
        error: true,
        code: 'token.expired',
        message: 'Token Invalid.',
      });

    return response.status(401).json({ message: 'Token Flopado' });
  }
}
