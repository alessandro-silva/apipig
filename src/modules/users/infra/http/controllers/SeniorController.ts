// import { Request, Response } from 'express';
// import { container } from 'tsyringe';
// // import { classToClass } from 'class-transformer';

// import SeniorShowService from '@modules/accesses/services/SeniorShowService';

// export default class SeniorController {
//   public async show(req: Request, res: Response): Promise<Response> {
//     const { numcad } = req.query;

//     const showSenior = container.resolve(SeniorShowService);

//     const senior = await showSenior.execute({
//       numcad: String(numcad),
//     });

//     return res.json(senior);
//   }
// }
