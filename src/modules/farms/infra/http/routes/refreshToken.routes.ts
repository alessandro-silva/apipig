import { Router } from 'express';

import RefreshTokenController from '../controllers/RefreshTokenController';

const refreshTokenController = new RefreshTokenController();
const refreshTokenRouter = Router();

refreshTokenRouter.post('/', refreshTokenController.create);

export default refreshTokenRouter;
