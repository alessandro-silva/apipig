import { Router } from 'express';
// import multer from 'multer';

// import uploadConfig from '@config/upload';
import ScoresController from '../controllers/ScoresController';

const scoresController = new ScoresController();

const scoresRouter = Router();
// const upload = multer(uploadConfig);

scoresRouter.get('/', scoresController.index);

scoresRouter.post('/', scoresController.create);

// scoresRouter.post(
//   '/import',
//   upload.single('file'),
//   scoresController.import,
// );

scoresRouter.put('/', scoresController.update);

export default scoresRouter;
