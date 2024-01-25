// import { injectable, inject } from 'tsyringe';
// // import { isAfter, addHours } from 'date-fns';

// import AppError from '@shared/errors/AppError';
// import IAccessesRepository from '../repositories/IUsersRepository';
// import IAccessTokensRepository from '../repositories/IAccessTokensRepository';
// import IHashProvider from '../providers/HashProvider/models/IHashProvider';

// // import User from '../infra/typeorm/entities/User';

// interface IRequest {
//   username: string;
//   password: string;
// }

// @injectable()
// class ResetPasswordService {
//   constructor(
//     @inject('AccessesRepository')
//     private accessesRepository: IAccessesRepository,

//     @inject('AccessTokensRepository')
//     private accessTokensRepository: IAccessTokensRepository,

//     @inject('HashProvider')
//     private hashProvider: IHashProvider,
//   ) {}

//   public async execute({ username, password }: IRequest): Promise<void> {
//     // const accessToken = await this.accessTokensRepository.findByToken(token);

//     // if (!accessToken) {
//     //   throw new AppError('Access token does not exists');
//     // }

//     const access = await this.accessesRepository.findByNickname(username);

//     if (!access) {
//       throw new AppError('Access does not exists');
//     }

//     // const tokenCreatedAt = accessToken.created_at;
//     // const compareDate = addHours(tokenCreatedAt, 2);

//     // if (isAfter(Date.now(), compareDate)) {
//     //   throw new AppError('Token expired');
//     // }

//     access.password = await this.hashProvider.generateHash(password);

//     await this.accessesRepository.save(access);
//   }
// }

// export default ResetPasswordService;
