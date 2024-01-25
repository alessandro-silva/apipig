// import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
// // import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

// import IAccessesOfRolesRepository from '@modules/accesses_of_roles/repositories/IAccessesOfRolesRepository';
// import IAccessesOfPermissionsRepository from '@modules/accesses_of_permissions/repositories/IAccessesOfPermissionsRepository';
// import IAccessesRepository from '../repositories/IUsersRepository';

// // import Access from '../infra/typeorm/entities/Access';
// import IResponseAccessDTO from '../dtos/IResponseAccessDTO';

// interface IRequest {
//   nickname: string;
//   name: string;
//   email: string;
//   tag: string;
//   flag_1?: boolean;
//   flag_2?: boolean;
//   flag_3?: boolean;
//   flag_4?: boolean;
//   flag_5?: boolean;
//   flag_6?: boolean;
//   flag_7?: boolean;
//   flag_8?: boolean;
//   flag_9?: boolean;
//   status?: boolean;
//   ramal?: number | string;
//   status_schedule?: boolean;
//   phone?: string;
//   image?: string;
//   job_position?: string;
//   senior_id?: string;
//   sector_id?: string;

//   // role_id?: string;
// }

// interface IResponse {
//   access: IResponseAccessDTO | undefined;
//   roles: string[];
//   permissions: string[];
// }

// @injectable()
// class UpdateAccessService {
//   constructor(
//     @inject('AccessesRepository')
//     private accessesRepository: IAccessesRepository,

//     @inject('AccessesOfRolesRepository')
//     private accessesOfRolesRepository: IAccessesOfRolesRepository,

//     @inject('AccessesOfPermissionsRepository')
//     private accessesOfPermissionsRepository: IAccessesOfPermissionsRepository,
//   ) {}

//   public async execute({
//     nickname,
//     name,
//     email,
//     tag,
//     flag_1,
//     flag_2,
//     flag_3,
//     flag_4,
//     flag_5,
//     flag_6,
//     flag_7,
//     flag_8,
//     flag_9,
//     status,
//     phone,
//     image,
//     job_position,
//     senior_id,
//     ramal,
//     status_schedule,
//     sector_id,
//   }: IRequest): Promise<IResponse> {
//     const access = await this.accessesRepository.findByNickname(nickname);

//     if (!access) {
//       throw new AppError('Access does not exists.');
//     }

//     if (flag_1 !== undefined) {
//       access.flag_1 = flag_1;
//     }

//     if (flag_2 !== undefined) {
//       access.flag_2 = flag_2;
//     }

//     if (flag_3 !== undefined) {
//       access.flag_3 = flag_3;
//     }

//     if (flag_4 !== undefined) {
//       access.flag_4 = flag_4;
//     }

//     if (flag_5 !== undefined) {
//       access.flag_5 = flag_5;
//     }

//     if (flag_6 !== undefined) {
//       access.flag_6 = flag_6;
//     }

//     if (flag_7 !== undefined) {
//       access.flag_7 = flag_7;
//     }

//     if (flag_8 !== undefined) {
//       access.flag_8 = flag_8;
//     }

//     if (flag_9 !== undefined) {
//       access.flag_9 = flag_9;
//     }

//     if (status === true) {
//       access.status = true;
//     }

//     if (status === false) {
//       access.status = false;
//     }

//     if (name) {
//       access.name = name;
//     }

//     if (email) {
//       access.email = email;
//     }

//     if (tag) {
//       access.tag = tag;
//     }

//     if (phone || phone === '') {
//       // if (phone !== Number()) {
//       //   throw new AppError('Phone column is number type');
//       // }

//       access.phone = phone;
//     }

//     if (ramal) {
//       access.ramal = Number(ramal);
//     }

//     if (ramal === '') {
//       access.ramal = null;
//     }

//     if (image) {
//       access.image = image;
//     }

//     if (job_position) {
//       access.job_position = job_position;
//     }

//     if (senior_id) {
//       access.senior_id = senior_id;
//     }

//     if (sector_id) {
//       access.sector_id = sector_id;
//     }

//     if (status_schedule === true) {
//       access.status_schedule = true;
//     }

//     if (status_schedule === false) {
//       access.status_schedule = false;
//     }

//     // if (sector_id) {
//     //   access.sector_id = sector_id;

//     //   await this.accessesRepository.save(access);

//     //   const accessRelation = await this.accessesRepository.findById(access.id);

//     //   if (!accessRelation) {
//     //     throw new AppError('Acess does not exists.');
//     //   }

//     //   return accessRelation;
//     // }

//     await this.accessesRepository.save(access);

//     const accessesOfRoles =
//       await this.accessesOfRolesRepository.findAllAccessById(access.id);

//     const accessesOfPermissions =
//       await this.accessesOfPermissionsRepository.findAllAccessById(access.id);

//     const roles = accessesOfRoles.map(
//       accessOfRole => accessOfRole.role.identification,
//     );

//     const permissions = accessesOfPermissions.map(
//       accessOfPermission => accessOfPermission.permission.identification,
//     );

//     const accessRelations = await this.accessesRepository.findById(access.id);

//     return { access: accessRelations, roles, permissions };
//   }
// }

// export default UpdateAccessService;
