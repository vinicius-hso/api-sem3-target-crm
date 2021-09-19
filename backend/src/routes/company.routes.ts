import CompanyController from '@controllers/CompanyController'
import Router from 'express';

const routes = Router();

routes.get('/', CompanyController.findAll);
routes.get('/:id', CompanyController.findById);
routes.post('/', CompanyController.create);
routes.put('/:id', CompanyController.update);
routes.delete('/:id', CompanyController.delete);

export default routes;
