import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import {
  addProductValidation,
  updateProductValidation,
} from './product.validation';
import { ProductController } from './product.controller';

const productRouter = Router();

productRouter.post(
  '/add',
  auth('seller'),
  validateRequest(addProductValidation),
  ProductController.addProduct,
);

productRouter.put(
  '/:productId',
  auth('seller'),
  validateRequest(updateProductValidation),
  ProductController.updateProduct,
);

productRouter.delete(
  '/:productId',
  auth('seller'),
  ProductController.deleteProduct,
);

productRouter.get('/:productId', ProductController.getSingleProduct);

productRouter.get('/', ProductController.getAllProducts);

export default productRouter;
