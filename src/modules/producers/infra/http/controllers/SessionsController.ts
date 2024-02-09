import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateProducerService from '@modules/producers/services/AuthenticateProducerService';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { cpf } = req.body;

    const authenticateProducer = container.resolve(AuthenticateProducerService);

    const session = await authenticateProducer.execute({
      cpf,
    });

    return res.json(session);
  }
}
