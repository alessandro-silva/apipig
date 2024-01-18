import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IScoresRepository from '../repositories/IScoresRepository';

import IScoreResponseDTO from '../dtos/IScoreResponseDTO';
import { ScoreMap } from '../mapper/ScoreMap';

interface IRequest {
  id: string;
  file?: string;
}

@injectable()
class UploadScoreService {
  constructor(
    @inject('ScoresRepository')
    private scoresRepository: IScoresRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ file, id }: IRequest): Promise<IScoreResponseDTO> {
    const score = await this.scoresRepository.findById(id);

    if (!score) {
      throw new AppError('Score does not exists.');
    }

    if (file) {
      if (score.file) {
        await this.storageProvider.delete(score.file, 'scores/file');
      }

      await this.storageProvider.save(file, 'scores/file');

      score.file = file;
    }

    await this.scoresRepository.save(score);

    return ScoreMap.toDTO(score);
  }
}

export default UploadScoreService;
