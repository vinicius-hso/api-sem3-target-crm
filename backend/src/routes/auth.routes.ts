import AuthController from '@controllers/AuthController';
import Router from 'express';

const routes = Router();

routes.post('/authenticate', AuthController.authenticate);
routes.post('/forgot-password', AuthController.forgotPassword);
routes.put('/reset-password', AuthController.resetPassword);

export { routes as AuthRoutes };
