import { Router } from 'express';

import scoresRouter from '@modules/scores/infra/http/routes/scores.routes';
import markingsRouter from '@modules/markings/infra/http/routes/markings.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import refreshRouter from '@modules/users/infra/http/routes/refreshToken.routes';

const routes = Router();

routes.use('/scores', scoresRouter);
routes.use('/markings', markingsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/refresh', refreshRouter);

export default routes;
