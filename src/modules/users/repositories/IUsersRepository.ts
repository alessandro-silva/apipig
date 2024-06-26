import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByCpf(cpf: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
