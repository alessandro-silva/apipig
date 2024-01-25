import { Request, Response } from 'express';
import { container } from 'tsyringe';
// import { classToClass } from 'class-transformer';

import ListUserService from '@modules/users/services/ListUserService';
// import ShowAccessService from '@modules/users/services/ShowAccessService';
import CreateUserService from '@modules/users/services/CreateUserService';
// import UpdateAccessService from '@modules/users/services/UpdateAccessService';

export default class UsersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listUsers = container.resolve(ListUserService);

    const users = await listUsers.execute();

    return res.json(users);
  }

  // public async show(req: Request, res: Response): Promise<Response> {
  //   const { access_id, sector_id } = req.query;

  //   const showAccess = container.resolve(ShowAccessService);

  //   const user = await showAccess.execute({
  //     access_id: access_id ? String(access_id) : undefined,
  //     sector_id: sector_id ? String(sector_id) : undefined,
  //   });

  //   return res.json(user);
  // }

  public async create(req: Request, res: Response): Promise<Response> {
    const {
      name,
      cpf,
      internal_code,
    } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      cpf,
      internal_code,
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
