import ICreateFarmTokenDTO from '../dtos/ICreateFarmTokenDTO';
import FarmToken from '../infra/typeorm/entities/FarmToken';

export default interface IFarmsTokensRepository {
  findById(id: string): Promise<FarmToken | undefined>;
  findByFarmId(farm_id: string): Promise<FarmToken | undefined>;
  create(data: ICreateFarmTokenDTO): Promise<FarmToken>;
  findByFarmIdAndRefreshToken(
    farm_id: string,
    refresh_token: string,
  ): Promise<FarmToken | undefined>;
  deleteById(id: string): Promise<void>;
}
