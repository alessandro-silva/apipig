import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SessiosController from '../controllers/SessionsController';

const sessionsController = new SessiosController();

const sessionsUsersRouter = Router();

sessionsUsersRouter.post(
  '/',
  // celebrate({
  //   [Segments.BODY]: {
  //     cpf: Joi.string().required(),
  //   },
  // }),
  sessionsController.create,
);

export default sessionsUsersRouter;
