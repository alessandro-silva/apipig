import { Router } from 'express';

import FarmsController from '../controllers/FarmsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const farmsController = new FarmsController();

const farmsRouter = Router();

farmsRouter.use(ensureAuthenticated);

farmsRouter.get('/', farmsController.index);
farmsRouter.get('/show', farmsController.show);
farmsRouter.post('/', farmsController.create);
farmsRouter.put('/', farmsController.update);

export default farmsRouter;
