import { getRepository, Repository } from 'typeorm';

import IUsersTokensRepository from '@modules/users/repositories/IUsersTokensRepository';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import ICreateUserTokenDTO from '@modules/users/dtos/ICreateUserTokenDTO';

class UsersTokensRepository implements IUsersTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async findById(id: string): Promise<UserToken | undefined> {
    const user = await this.ormRepository.findOne({ id });

    return user;
  }

  public async findByUserId(
    user_id: string,
  ): Promise<UserToken | undefined> {
    const user = await this.ormRepository.findOne({ user_id });

    return user;
  }

  public async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserToken | undefined> {
    const usersTokens = await this.ormRepository.findOne({
      user_id,
      refresh_token,
    });

    return usersTokens;
  }

  public async create(data: ICreateUserTokenDTO): Promise<UserToken> {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);

    return user;
  }

  public async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default UsersTokensRepository;
