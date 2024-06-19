import { Request, Response } from 'express';
import { container } from 'tsyringe';
// import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const session = await authenticateUser.execute({
      email,
    });

    return res.json(session);
  }
}
