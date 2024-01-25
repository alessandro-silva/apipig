// import { Request, Response } from 'express';

// import { container } from 'tsyringe';

// import SendForgotPasswordEmailService from '@modules/accesses/services/SendForgotPasswordEmailService';

// export default class ForgotPasswordController {
//   public async create(req: Request, res: Response): Promise<Response> {
//     const { nickname } = req.body;

//     const sendForgotPasswordEmail = container.resolve(
//       SendForgotPasswordEmailService,
//     );

//     await sendForgotPasswordEmail.execute({
//       nickname,
//     });

//     return res.status(204).json();
//   }
// }
