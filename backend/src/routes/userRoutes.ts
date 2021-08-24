import UserController from '@controllers/UserController';
import Router from 'express';

const routes = Router();

routes.post('/register', UserController.registerUser);
routes.post('/authenticate', UserController.authenticateUser);
routes.post('/reset-password', UserController.resetPassword);
routes.post('/forgot-password', UserController.forgotPassword);

export { routes as UserRoutes };
