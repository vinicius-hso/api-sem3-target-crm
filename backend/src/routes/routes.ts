import DealRoutes from '@routes/deal.routes';
import Router from 'express';
import AuthRoutes from './auth.routes';
import CompanyRoutes from './company.routes';
import PipelineRoutes from './pipeline.routes';
import UserRoutes from './user.routes';
import ContactRoutes from './contact.routes';

const routes = Router();

routes.get('/', (req, res) => {
  res.json({ API: 'Terceiro Semetre' });
});

// prefix
routes.use('/auth', AuthRoutes);
// route.use('/user', ensureAuthenticated, ensureAdmin, UserRoutes);
// route.use('/pipeline', ensureAuthenticated, PipelineRoutes);
// route.use('/company', ensureAuthenticated, CompanyRoutes);

// rotas sem auth para devs;
routes.use('/deal', DealRoutes);
routes.use('/user', UserRoutes);
routes.use('/company', CompanyRoutes);
routes.use('/pipeline', PipelineRoutes);
routes.use('/contact', ContactRoutes);

export default routes;