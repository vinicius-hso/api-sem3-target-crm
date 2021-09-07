import Router from 'express';
import { AuthRoutes } from './auth.routes';
import { UserRoutes } from './user.routes';
import { PipelineRoutes } from './pipeline.routes';
import { ensureAdmin } from '@middlewares/ensureAdmin';
import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';

const route = Router();

route.get('/', (req, res) => {
  res.json({ API: 'Terceiro Semetre' });
});

// prefix
route.use('/auth', AuthRoutes);
route.use('/user', ensureAuthenticated, ensureAdmin, UserRoutes);
route.use('/pipeline', ensureAuthenticated, PipelineRoutes);

export { route };
