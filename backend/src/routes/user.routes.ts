import UserController from '@controllers/UserController';
import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import { ensureAdmin } from '@middlewares/ensureAdmin';
import Router from 'express';

const routes = Router();

routes.get('/', UserController.findUsers); // rota para ambiente de dev
routes.post('/', UserController.create); // rota para ambiente de dev
// routes.post('/create', ensureAuthenticated, ensureAdmin, UserController.createUser); // rota com os middlewares
routes.put('/:id', UserController.update); 
routes.delete('/:id', UserController.delete); 

export { routes as UserRoutes };
