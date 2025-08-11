import { Router } from 'express';
import authRouter from '../modules/auth/auth.routes';
import storeRouter from '../modules/store/store.routes';
import productRouter from '../modules/product/product.routes';
import cartRouter from '../modules/cart/cart.routes';

const router = Router();

const moduleRoutes: { path: string; router: Router }[] = [
  {
    path: '/auth',
    router: authRouter,
  },
  {
    path: '/stores',
    router: storeRouter,
  },
  {
    path: '/products',
    router: productRouter,
  },
  {
    path: '/cart',
    router: cartRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;
