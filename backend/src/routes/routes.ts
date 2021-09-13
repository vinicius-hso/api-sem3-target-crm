import Router from 'express';
import { AuthRoutes } from './auth.routes';
import { UserRoutes } from './user.routes';
import { PipelineRoutes } from './pipeline.routes';
import { CompanyRoutes } from './company.routes';
import { ensureAdmin } from '@middlewares/ensureAdmin';
import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';

const route = Router();

route.get('/', (req, res) => {
  res.json({ API: 'Terceiro Semetre' });
});

// prefix
route.use('/auth', AuthRoutes);
// route.use('/user', ensureAuthenticated, ensureAdmin, UserRoutes);
// route.use('/pipeline', ensureAuthenticated, PipelineRoutes);
// route.use('/company', ensureAuthenticated, CompanyRoutes);

// rotas sem auth para devs;
route.use('/user', UserRoutes);
route.use('/company', CompanyRoutes);
route.use('/pipeline', PipelineRoutes);

import Contact from '@entities/Contact'
route.get('/contact', async (req,res) => {
  const contacts = await Contact.find({ relations: ['company'] });

  res.json(contacts);
})

export { route };
