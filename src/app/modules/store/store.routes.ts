import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import {
  createStoreValidation,
  updateStoreValidation,
} from './store.validation';
import { StoreController } from './store.controller';

const storeRouter = Router();

storeRouter.post(
  '/create',
  auth('seller'),
  validateRequest(createStoreValidation),
  StoreController.createStore,
);

storeRouter.get('/my-store', auth('seller'), StoreController.getStoreByUserId);

storeRouter.get('/', StoreController.getAllStores);

storeRouter.put(
  '/:storeId',
  auth('seller'),
  validateRequest(updateStoreValidation),
  StoreController.updateStore,
);

storeRouter.get('/:storeId', StoreController.getStoreById);

export default storeRouter;
