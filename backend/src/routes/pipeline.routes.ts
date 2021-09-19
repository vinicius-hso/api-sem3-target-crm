import PipelineController from '@controllers/PipelineController';
import Router from 'express';

const routes = Router();

routes.get('/', PipelineController.findAll);
routes.get('/:id', PipelineController.findById);
routes.post('/', PipelineController.create);
routes.put('/:id', PipelineController.update);
routes.delete('/:id', PipelineController.delete);

export default routes;
