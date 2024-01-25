import ICreateUserTokenDTO from '../dtos/ICreateUserTokenDTO';
import UserToken from '../infra/typeorm/entities/UserToken';

export default interface IUsersTokensRepository {
  findById(id: string): Promise<UserToken | undefined>;
  findByUserId(user_id: string): Promise<UserToken | undefined>;
  create(data: ICreateUserTokenDTO): Promise<UserToken>;
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserToken | undefined>;
  deleteById(id: string): Promise<void>;
}
