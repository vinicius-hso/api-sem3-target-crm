import Router from 'express';
import UserController from '@controllers/UserController';
import { ensureAdmin } from '@middlewares/ensureAdmin';
import { ensureOwner } from '@middlewares/ensureOwner';
import { ensureAdminOrOwner } from '@middlewares/ensureAdminOrOwner';
import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';

const routes = Router();

// routes.get('/', ensureAuthenticated, ensureAdmin, UserController.findUsers);
// routes.get('/:id', ensureAuthenticated, ensureAdmin, UserController.findUserById);
// routes.put('/update-password/:id', ensureAuthenticated, ensureOwner, UserController.passwordUpdate);
// routes.post('/', ensureAuthenticated, ensureAdmin, UserController.create);
// routes.put('/:id', ensureAuthenticated, ensureAdminOrOwner, UserController.update);
// routes.delete('/:id', ensureAuthenticated, ensureAdmin, UserController.delete);

routes.get('/', UserController.findUsers);
routes.get('/:id', UserController.findUserById);
routes.post('/', UserController.create);
routes.put('/update-password/:id', UserController.passwordUpdate);
routes.put('/:id', UserController.update);
routes.delete('/:id', UserController.delete);

export default routes;
