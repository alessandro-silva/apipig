import { injectable, inject } from 'tsyringe';

import IMarkingsRepository from '../repositories/IMarkingsRepository';
import Marking from '../infra/typeorm/entities/Marking';

interface IRequest {
  quantity: number;
  weight: string;
  score_id: string;
}

@injectable()
class CreateMarkingService {
  constructor(
    @inject('MarkingsRepository')
    private markingsRepository: IMarkingsRepository,
  ) {}

  public async execute({
    quantity,
    weight,
    score_id,
  }: IRequest): Promise<Marking> {
    const marking = await this.markingsRepository.create({
      quantity,
      weight,
      score_id,
    });

    return marking;
  }
}

export default CreateMarkingService;
