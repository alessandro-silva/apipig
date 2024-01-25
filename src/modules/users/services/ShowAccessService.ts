// import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
// // import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

// import IAccessesOfRolesRepository from '@modules/accesses_of_roles/repositories/IAccessesOfRolesRepository';
// import IAccessesOfPermissionsRepository from '@modules/accesses_of_permissions/repositories/IAccessesOfPermissionsRepository';
// import IAccessesRepository from '../repositories/IUsersRepository';
// import IResponseAccessDTO from '../dtos/IResponseAccessDTO';

// interface IRequest {
//   access_id?: string;
//   sector_id?: string;
// }

// interface IRelation {
//   access: IResponseAccessDTO;
//   roles: string[];
//   permissions: string[];
// }

// @injectable()
// class ShowAccessService {
//   constructor(
//     @inject('AccessesRepository')
//     private accessesRepository: IAccessesRepository,

//     @inject('AccessesOfRolesRepository')
//     private accessesOfRolesRepository: IAccessesOfRolesRepository,

//     @inject('AccessesOfPermissionsRepository')
//     private accessesOfPermissionsRepository: IAccessesOfPermissionsRepository,
//   ) {}

//   // eslint-disable-next-line consistent-return
//   public async execute({
//     access_id,
//     sector_id,
//   }: IRequest): Promise<IRelation | IResponseAccessDTO[] | void> {
//     // const accessCache = await this.cacheProvider.recover<
//     //   Access[]
//     // >(`accesses-of-sectors-list:${access_id}`);

//     // if (!accessCache) {

//     if (access_id) {
//       const access = await this.accessesRepository.findById(access_id);

//       if (!access) {
//         throw new AppError('Access does not exists.');
//       }

//       const accessesOfRoles =
//         await this.accessesOfRolesRepository.findAllAccessById(access_id);

//       const accessesOfPermissions =
//         await this.accessesOfPermissionsRepository.findAllAccessById(access_id);

//       const roles = accessesOfRoles.map(
//         accessOfRole => accessOfRole.role.identification,
//       );

//       const permissions = accessesOfPermissions.map(
//         accessOfPermission => accessOfPermission.permission.identification,
//       );

//       delete access.password;

//       return {
//         access,
//         roles,
//         permissions,
//       };
//     }

//     if (sector_id) {
//       try {
//         const accesses = await this.accessesRepository.findAllBySectorId(
//           sector_id,
//         );

//         accesses.forEach(access => {
//           // eslint-disable-next-line no-param-reassign
//           delete access.password;
//           return {
//             ...access,
//           };
//         });

//         return accesses;
//       } catch (err: any) {
//         throw new AppError(`Accesses does not exists. Error: ${err.message}`);
//       }
//     }
//   }
// }

// export default ShowAccessService;
