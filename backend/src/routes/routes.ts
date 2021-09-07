import Router from 'express';
import { AuthRoutes } from './auth.routes';
import { UserRoutes } from './user.routes';
import { PipelineRoutes } from './pipeline.routes';
import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';

const route = Router();

route.get('/', (req, res) => {
  res.json({ API: 'Terceiro Semetre' });
});

// prefix
route.use('/auth', AuthRoutes);
route.use('/user', UserRoutes);
route.use('/pipeline', PipelineRoutes);

export { route };
