import * as express from 'express';
import { router as user } from './user';

const router = express.Router({ mergeParams: true });

const routes = [
  {
    path: '/user',
    router: user
  }
];

routes.forEach(r => router.use(r.path, r.router));

export default router;
