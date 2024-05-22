import Marking from '../infra/typeorm/entities/Marking';

export default interface IMarkingsRepository {
  findAll(): Promise<Marking[]>;
  findAllByScoreId(score_id: string): Promise<Marking[]>;
  findById(id: string): Promise<Marking | undefined>;
  create(data: Marking): Promise<Marking>;
  createAll(data: Marking[]): Promise<Marking[]>;
  save(marking: Marking): Promise<Marking>;
}
