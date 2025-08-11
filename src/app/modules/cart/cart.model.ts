import { model, Schema } from 'mongoose';
import TCart from './cart.interface';
import tr from 'zod/v4/locales/tr.cjs';

const cartSchema = new Schema<TCart>(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      unique: true,
    },
    storeId: {
      type: Schema.Types.ObjectId,
      ref: 'Store',
      required: true,
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    totalAmount: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Cart = model<TCart>('Cart', cartSchema);

export default Cart;
