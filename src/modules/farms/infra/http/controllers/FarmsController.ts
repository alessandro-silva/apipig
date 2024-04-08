import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListFarmService from '@modules/farms/services/ListFarmService';
import ShowFarmService from '@modules/farms/services/ShowFarmService';
import CreateFarmService from '@modules/farms/services/CreateFarmService';
import UpdateFarmService from '@modules/farms/services/UpdateFarmService';

export default class FarmsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listFarm = container.resolve(ListFarmService);

    const farms = await listFarm.execute();

    return res.json(farms);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id, producer_id } = req.query;

    const showFarm = container.resolve(ShowFarmService);

    const farms = await showFarm.execute({
      id: id ? String(id) : undefined,
      producer_id: producer_id ? String(producer_id) : undefined,
    });

    return res.json(farms);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, nickname, producer_id } = req.body;

    const createFarm = container.resolve(CreateFarmService);

    const farm = await createFarm.execute({
      name,
      nickname,
      producer_id,
    });

    return res.json(farm);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.query;
    const { name, nickname, producer_id } = req.body;

    const updateMarking = container.resolve(UpdateFarmService);

    const farm = await updateMarking.execute({
      id: String(id),
      name,
      nickname,
      producer_id,
    });

    return res.json(farm);
  }
}
