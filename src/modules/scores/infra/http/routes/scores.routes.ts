import { Router } from 'express';

import ScoresController from '../controllers/ScoresController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const scoresController = new ScoresController();

const scoresRouter = Router();

scoresRouter.use(ensureAuthenticated);

scoresRouter.get('/', scoresController.index);
scoresRouter.get('/show', scoresController.show);
scoresRouter.get('/filter', scoresController.filter);
scoresRouter.get('/validate', scoresController.validate);
scoresRouter.post('/', scoresController.create);
scoresRouter.post('/createAll', scoresController.createAll);
scoresRouter.put('/', scoresController.update);
scoresRouter.delete('/', scoresController.delete);

// scoresRouter.post(
//   '/import',
//   upload.single('file'),
//   scoresController.import,
// );

// scoresRouter.patch(
//   '/upload',
//   upload.single('file'),
//   scoresController.uploadFile,
// );

export default scoresRouter;
