import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import DealRoutes from '@routes/deal.routes';
import Router from 'express';
import AuthRoutes from './auth.routes';
import CompanyRoutes from './company.routes';
import ContactRoutes from './contact.routes';
import PipelineRoutes from './pipeline.routes';
import UserRoutes from './user.routes';

const routes = Router();

routes.get('/', (req, res) => {
  res.json({ API: 'Terceiro Semetre' });
});

// prefix
routes.use('/auth', AuthRoutes);
routes.use('/user', UserRoutes); // middlewares estão no UserRoutes;
routes.use('/pipeline', ensureAuthenticated, PipelineRoutes);
routes.use('/company', ensureAuthenticated, CompanyRoutes);

// rotas sem auth para devs;
routes.use('/deal', DealRoutes);
//routes.use('/pipeline', PipelineRoutes);
routes.use('/contact', ContactRoutes);

export default routes;
