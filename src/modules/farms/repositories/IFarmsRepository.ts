import Farm from '../infra/typeorm/entities/Farm';
import ICreateFarmDTO from '../dtos/ICreateFarmDTO';
import { DeleteResult } from 'typeorm';

export default interface IFarmsRepository {
  findAll(): Promise<Farm[]>;
  findAllByProducerId(producer_id: string): Promise<Farm[]>;
  findByNickname(nickname: string): Promise<Farm | undefined>;
  findById(id: string): Promise<Farm | undefined>;
  create(data: ICreateFarmDTO): Promise<Farm>;
  createAll(data: ICreateFarmDTO[]): Promise<Farm[]>;
  save(marking: Farm): Promise<Farm>;
  delete(id: string): Promise<DeleteResult>;
}
