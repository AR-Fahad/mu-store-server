import { Router } from 'express';
import auth from '../../middlewares/auth';
import { CartController } from './cart.controller';

const cartRouter = Router();

cartRouter.post('/add-product', auth('customer'), CartController.addToCart);

cartRouter.post(
  '/remove-product',
  auth('customer'),
  CartController.removeFromCart,
);

cartRouter.get('/my-cart', auth('customer'), CartController.getMyCart);

export default cartRouter;
