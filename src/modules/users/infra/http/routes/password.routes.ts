// import { Router } from 'express';
// import { celebrate, Segments, Joi } from 'celebrate';

// // import ForgotPasswordController from '../controllers/ForgotPasswordController';
// import ResetPasswordController from '../controllers/ResetPasswordController';

// // const forgotPasswordController = new ForgotPasswordController();
// const resetPasswordController = new ResetPasswordController();

// const passwordRouter = Router();

// // passwordRouter.post(
// //   '/forgot',
// //   celebrate({
// //     [Segments.BODY]: {
// //       nickname: Joi.string().required(),
// //     },
// //   }),
// //   forgotPasswordController.create,
// // );

// passwordRouter.post(
//   '/reset',
//   celebrate({
//     [Segments.BODY]: {
//       username: Joi.string().required(),
//       password: Joi.string().required(),
//       password_confirmation: Joi.string().required().valid(Joi.ref('password')),
//     },
//   }),
//   resetPasswordController.create,
// );

// export default passwordRouter;
