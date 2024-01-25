import { Router } from 'express';

import MarkingsController from '../controllers/MarkingsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const markingsController = new MarkingsController();

const markingsRouter = Router();

markingsRouter.use(ensureAuthenticated);

markingsRouter.get('/', markingsController.index);

markingsRouter.post('/', markingsController.create);

markingsRouter.post('/createAll', markingsController.createAll);

// markingsRouter.post(
//   '/import',
//   upload.single('file'),
//   markingsController.import,
// );

markingsRouter.put('/', markingsController.update);

export default markingsRouter;
