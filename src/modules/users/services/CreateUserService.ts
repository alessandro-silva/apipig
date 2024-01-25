import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
// import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  name: string;
  cpf: string;
  internal_code: string;
}

// @inject('HashProvider')
// private hashProvider: IHashProvider,

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async execute({
    name,
    cpf,
    internal_code,
  }: IRequest): Promise<User> {
    // const hashedPassword = await this.hashProvider.generateHash(internal_code);

    const user = await this.usersRepository.create({
      name,
      cpf,
      internal_code,
    });

    return user;
  }
}

export default CreateUserService;
