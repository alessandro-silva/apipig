import { Router } from 'express';

import scoresRouter from '@modules/scores/infra/http/routes/scores.routes';
import markingsRouter from '@modules/markings/infra/http/routes/markings.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsUsersRouter from '@modules/users/infra/http/routes/sessions.routes';
import refreshRouter from '@modules/users/infra/http/routes/refreshToken.routes';
import producersRouter from '@modules/producers/infra/http/routes/producers.routes';
import sessionsProducersRouter from '@modules/producers/infra/http/routes/sessions.routes';
import refreshProducerRouter from '@modules/producers/infra/http/routes/refreshToken.routes';

const routes = Router();

routes.use('/scores', scoresRouter);
routes.use('/markings', markingsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsUsersRouter);
routes.use('/refresh', refreshRouter);
routes.use('/producers', producersRouter);
routes.use('/sessions-producers', sessionsProducersRouter);
routes.use('/refresh-producer', refreshProducerRouter);

export default routes;
