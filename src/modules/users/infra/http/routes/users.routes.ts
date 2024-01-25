import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersController';

const usersController = new UsersController();
const usersRouter = Router();

usersRouter.use(ensureAuthenticated);

usersRouter.get('/', usersController.index);

// usersRouter.get('/show', usersController.show);

usersRouter.post('/', usersController.create);

// usersRouter.put('/', usersController.update);

export default usersRouter;
