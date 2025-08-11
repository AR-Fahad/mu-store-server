import { model, Schema } from 'mongoose';
import TStore from './store.interface';

const storeSchema = new Schema<TStore>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    ownerId: {
      type: Object,
      required: true,
      ref: 'User',
      unique: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Store = model<TStore>('Store', storeSchema);

export default Store;
