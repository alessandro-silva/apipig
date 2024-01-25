import { injectable, inject } from 'tsyringe';

import IMarkingsRepository from '../repositories/IMarkingsRepository';
import Marking from '../infra/typeorm/entities/Marking';

@injectable()
class CreateMarkingService {
  constructor(
    @inject('MarkingsRepository')
    private markingsRepository: IMarkingsRepository,
  ) {}

  public async execute(data: Marking): Promise<Marking> {
    const marking = await this.markingsRepository.create(data);

    return marking;
  }
}

export default CreateMarkingService;
