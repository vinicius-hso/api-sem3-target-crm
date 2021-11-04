import DealController from '@controllers/DealController'
import { ensureAdmin } from '@middlewares/ensureAdmin';
import Router from 'express';

const routes = Router();

routes.get('/', DealController.findAll);
routes.get('/:id', DealController.findById);
routes.post('/', DealController.create);
routes.put('/:id', DealController.update);
routes.delete('/:id', ensureAdmin, DealController.delete);
routes.post('/:id/activity', DealController.insertActivity);
routes.put('/:id/pipelineUpdate', DealController.pipelineUpdate);

export default routes;
