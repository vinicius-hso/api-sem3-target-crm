import UserController from '@controllers/UserController';
import Router from 'express';

const routes = Router();

routes.get('/', UserController.findUsers);
routes.post('/', UserController.create);
routes.put('/:id', UserController.update);
routes.delete('/:id', UserController.delete);

export default routes;
