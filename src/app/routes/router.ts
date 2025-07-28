import { Router } from 'express';
import authRouter from '../modules/auth/auth.routes';

const router = Router();

const moduleRoutes: { path: string; router: Router }[] = [
  {
    path: '/users',
    router: authRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;
