import UserController from '@controllers/UserController';
import Router from 'express';

const routes = Router();

routes.post('/register', UserController.createUser);
routes.post('/authenticate', UserController.authenticateUser);
routes.post('/forgot-password', UserController.forgotPassword);
routes.post('/reset-password', UserController.resetPassword);

export { routes as UserRoutes };
