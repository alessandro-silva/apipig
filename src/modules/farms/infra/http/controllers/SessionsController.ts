import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateProducerService from '@modules/farms/services/AuthenticateFarmService';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { nickname } = req.body;

    const authenticateProducer = container.resolve(AuthenticateProducerService);

    const session = await authenticateProducer.execute({
      nickname,
    });

    return res.json(session);
  }
}
