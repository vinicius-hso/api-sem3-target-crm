import AuthController from '@controllers/AuthController';
import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import { ensureAdmin } from '@middlewares/ensureAdmin';
import Router from 'express';

const routes = Router();

routes.post('/authenticate', AuthController.authenticate);
routes.post('/forgot-password', AuthController.forgotPassword);
routes.put('/reset-password', AuthController.resetPassword);

export { routes as AuthRoutes };
