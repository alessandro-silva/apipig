// import { injectable, inject } from 'tsyringe';
// import fetch from 'node-fetch';

// import AppError from '@shared/errors/AppError';
// import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
// import IScoresRepository from '../repositories/IScoresRepository';

// import { ScoreMap } from '../mapper/ScoreMap';
// import api from '@config/api';

// interface IRequest {
//   id: string;
//   file?: string;
// }

// @injectable()
// class UploadScoreService {
//   constructor(
//     @inject('ScoresRepository')
//     private scoresRepository: IScoresRepository,

//     @inject('StorageProvider')
//     private storageProvider: IStorageProvider,
//   ) { }

//   public async execute({ file, id }: IRequest): Promise<any> {
//     const score = await this.scoresRepository.findById(id);

//     if (!score) {
//       throw new AppError('Score does not exists.');
//     }

//     if (file) {
//       if (score.file) {
//         await this.storageProvider.delete(score.file, 'scores/file');
//       }

//       await this.storageProvider.save(file, 'scores/file');

//       score.file = file;
//     }

//     await this.scoresRepository.save(score);

//     const noUploadScores = await this.scoresRepository.findByStatus(false);

//     if (noUploadScores.length === 0) {
//       return { score: ScoreMap.toDTO(score), upload: '0 scores' };
//     }

//     noUploadScores.forEach(async score => {
//       score.status = true;

//       await this.scoresRepository.save(score);
//     });

//     fetch(`${api.url}/scores/createAll`, {
//       method: "POST",
//       body: JSON.stringify(noUploadScores),
//     });

//     return ScoreMap.toDTO(score);
//   }
// }

// export default UploadScoreService;
