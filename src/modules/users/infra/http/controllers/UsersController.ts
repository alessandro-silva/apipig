import { Request, Response } from 'express';
import { container } from 'tsyringe';
// import { classToClass } from 'class-transformer';

import ListUserService from '@modules/users/services/ListUserService';
import ShowUserService from '@modules/users/services/ShowUserService';
import CreateUserService from '@modules/users/services/CreateUserService';
// import UpdateAccessService from '@modules/users/services/UpdateAccessService';

export default class UsersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listUsers = container.resolve(ListUserService);

    const users = await listUsers.execute();

    return res.json(users);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.query;

    const showUser = container.resolve(ShowUserService);

    const user = await showUser.execute({
      id: String(id),
    });

    return res.json(user);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const {
      name,
      cpf,
      internal_code,
      email,
    } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      cpf,
      internal_code,
      email,
    });

    return res.json(user);
  }

  // public async update(req: Request, res: Response): Promise<Response> {
  //   const {
  //     nickname,
  //     name,
  //     email,
  //     tag,
  //     flag_1,
  //     flag_2,
  //     flag_3,
  //     flag_4,
  //     flag_5,
  //     flag_6,
  //     flag_7,
  //     flag_8,
  //     flag_9,
  //     status,
  //     ramal,
  //     phone,
  //     status_schedule,
  //     image,
  //     job_position,
  //     senior_id,
  //     sector_id,
  //     // role_id,
  //   } = req.body;

  //   const updateAccess = container.resolve(UpdateAccessService);

  //   const user = await updateAccess.execute({
  //     nickname,
  //     name,
  //     email,
  //     tag,
  //     flag_1,
  //     flag_2,
  //     flag_3,
  //     flag_4,
  //     flag_5,
  //     flag_6,
  //     flag_7,
  //     flag_8,
  //     flag_9,
  //     status,
  //     ramal,
  //     phone,
  //     status_schedule,
  //     image,
  //     job_position,
  //     senior_id,
  //     sector_id,
  //     // role_id,
  //   });

  //   return res.json(user);
  // }
}
