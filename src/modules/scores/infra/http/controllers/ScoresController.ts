import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListScoreService from '@modules/scores/services/ListScoreService';
import ShowScoreService from '@modules/scores/services/ShowScoreService';
import CreateScoreService from '@modules/scores/services/CreateScoreService';
import CreateAllScoreService from '@modules/scores/services/CreateAllScoreService';
import UpdateScoreService from '@modules/scores/services/UpdateScoreService';
import DeleteScoreService from '@modules/scores/services/DeleteScoreService';
import FilterServiceScoreService from '@modules/scores/services/FilterServiceScoreService';
import ValidateScoreService from '@modules/scores/services/ValidateScoreService';

export default class ScoresController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listScore = container.resolve(ListScoreService);

    const score = await listScore.execute();

    return res.json(score);
  }

  public async validate(req: Request, res: Response): Promise<Response> {
    const validateScore = container.resolve(ValidateScoreService);

    const score = await validateScore.execute();

    return res.json(score);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id, producer_id } = req.query;

    const showScore = container.resolve(ShowScoreService);

    const score = await showScore.execute({
      id: id ? String(id) : undefined,
      producer_id: producer_id ? String(producer_id) : undefined,
    });

    return res.json(score);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const createScore = container.resolve(CreateScoreService);

    const score = await createScore.execute(req.body);

    return res.json(score);
  }

  public async createAll(req: Request, res: Response): Promise<Response> {
    const createAllScore = container.resolve(CreateAllScoreService);

    const scores = await createAllScore.execute(req.body);

    return res.json(scores);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.query;
    const {
      quantity,
      weight,
      start_date,
      end_date,
      status,
      name,
      lote,
      nfe,
      type,
      female,
      male,
      farm_id_internal,
      farm_id_received,
      farm_id_sender,
      producer_id_internal,
      producer_id_received,
      producer_id_sender,
    } = req.body;

    const updateScore = container.resolve(UpdateScoreService);

    const score = await updateScore.execute({
      id: String(id),
      quantity,
      weight,
      start_date,
      end_date,
      status,
      name,
      lote,
      nfe,
      type,
      female,
      male,
      farm_id_internal,
      farm_id_received,
      farm_id_sender,
      producer_id_internal,
      producer_id_received,
      producer_id_sender,
    });

    return res.json(score);
  }

  public async filter(req: Request, res: Response): Promise<Response> {
    const {
      type,
      progress,
      farm_id_internal,
      producer_id_internal,
      farm_id_received,
      producer_id_received,
      farm_id_sender,
      producer_id_sender,
      created_at,
      take,
      page,
    } = req.query;

    const filterServiceScore = container.resolve(FilterServiceScoreService);

    const scores = await filterServiceScore.execute({
      type: type ? String(type) : undefined,
      progress: progress ? String(progress) : undefined,
      farm_id_internal: farm_id_internal ? String(farm_id_internal) : undefined,
      producer_id_internal: producer_id_internal ? String(producer_id_internal) : undefined,
      farm_id_received: farm_id_received ? String(farm_id_received) : undefined,
      producer_id_received: producer_id_received ? String(producer_id_received) : undefined,
      farm_id_sender: farm_id_sender ? String(farm_id_sender) : undefined,
      producer_id_sender: producer_id_sender ? String(producer_id_sender) : undefined,
      created_at: created_at ? String(created_at) : undefined,
      take: Number(take),
      page: Number(page),
    });

    return res.json(scores);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.query;

    const deleteScore = container.resolve(DeleteScoreService);

    const score = await deleteScore.execute(String(id));

    return res.json(score);
  }
}
