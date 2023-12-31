import { Request, Response } from 'express';
import { container } from 'tsyringe';
// import { classToClass } from 'class-transformer';

import ListScoreService from '@modules/scores/services/ListScoreService';
// import ShowWarningService from '@modules/scores/services/ShowWarningService';
import CreateScoreService from '@modules/scores/services/CreateScoreService';
import UpdateScoreService from '@modules/scores/services/UpdateScoreService';
// import ImportWarningService from '@modules/scores/services/ImportWarningService';

export default class ScoresController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listScore = container.resolve(ListScoreService);

    const score = await listScore.execute();

    return res.json(score);
  }

  // public async show(req: Request, res: Response): Promise<Response> {
  //   const { quantity } = req.params;

  //   const showWarning = container.resolve(ShowWarningService);

  //   const employee = await showWarning.execute({
  //     quantity: Number(quantity),
  //   });

  //   return res.json(employee);
  // }

  // public async import(req: Request, res: Response): Promise<Response> {
  //   const importWarning = container.resolve(ImportWarningService);

  //   const warnings = await importWarning.execute(req.file.path);

  //   return res.json(warnings);
  // }

  public async create(req: Request, res: Response): Promise<Response> {
    const { quantity, weight } = req.body;

    const createScore = container.resolve(CreateScoreService);

    const score = await createScore.execute({
      quantity,
      weight,
    });

    return res.json(score);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.query;
    const { quantity, weight } = req.body;

    const updateScore = container.resolve(UpdateScoreService);

    const score = await updateScore.execute({
      id: String(id),
      quantity,
      weight,
    });

    return res.json(score);
  }
}
