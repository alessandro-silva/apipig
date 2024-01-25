import { Request, Response } from 'express';
import { container } from 'tsyringe';
// import { classToClass } from 'class-transformer';

import RefreshTokenService from '@modules/users/services/RefreshTokenService';

export default class RefreshTokenController {
  public async create(request: Request, response: Response): Promise<Response> {
    const refresh_token =
      request.body.refresh_token ||
      request.headers['x-access-refresh_token'] ||
      request.query.refresh_token;

    const refreshTokenService = container.resolve(RefreshTokenService);

    const refreshToken = await refreshTokenService.execute(refresh_token);

    return response.json(refreshToken);
  }
}
