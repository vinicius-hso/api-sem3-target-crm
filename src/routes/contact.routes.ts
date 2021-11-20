import ContactController from '@controllers/ContactController';
import Router from 'express';

const routes = Router();

routes.get('/', ContactController.findAll);
routes.get('/:id', ContactController.findById);
routes.post('/', ContactController.create);
routes.put('/:id', ContactController.update);
routes.delete('/:id', ContactController.delete);

export default routes;