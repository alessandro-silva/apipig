// import { Request, Response } from 'express';

// import { container } from 'tsyringe';

// import ResetPasswordService from '@modules/accesses/services/ResetPasswordService';

// export default class ResetPasswordController {
//   public async create(req: Request, res: Response): Promise<Response> {
//     const { username, password } = req.body;

//     const resetPasswordEmail = container.resolve(ResetPasswordService);

//     await resetPasswordEmail.execute({
//       username,
//       password,
//     });

//     return res.status(204).json();
//   }
// }
