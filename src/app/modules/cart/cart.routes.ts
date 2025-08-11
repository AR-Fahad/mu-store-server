import { Router } from 'express';
import auth from '../../middlewares/auth';
import { CartController } from './cart.controller';

const cartRouter = Router();

cartRouter.post('/add-product', auth('customer'), CartController.addToCart);

export default cartRouter;
