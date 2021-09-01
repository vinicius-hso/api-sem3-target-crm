import PipelineController from '@controllers/PipelineController';
import Router from 'express';

const routes = Router();

routes.get('/', PipelineController.getPipeline);
routes.post('/', PipelineController.createPipeline);
routes.put('/:id', PipelineController.updatePipeline);
routes.delete('/:id', PipelineController.deletePipeline);

export { routes as PipelineRoutes };
