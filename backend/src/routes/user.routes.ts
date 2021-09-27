import UserController from '@controllers/UserController';
import { ensureAdmin } from '@middlewares/ensureAdmin';
import { ensureAdminOrOwner } from '@middlewares/ensureAdminOrOwner';
import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import Router from 'express';

const routes = Router();

// routes.get('/', ensureAuthenticated, ensureAdmin, UserController.findUsers);
// routes.get('/:id', ensureAuthenticated, ensureAdmin, UserController.findUserById);
// routes.post('/', ensureAuthenticated, ensureAdmin, UserController.create);
// routes.put('/:id', ensureAuthenticated, ensureAdminOrOwner, UserController.update);
// routes.delete('/:id', ensureAuthenticated, ensureAdmin, UserController.delete);

routes.get('/', UserController.findUsers);
routes.get('/:id', UserController.findUserById);
routes.post('/', UserController.create);
routes.put('/:id', UserController.update);
routes.delete('/:id', UserController.delete);

export default routes;
