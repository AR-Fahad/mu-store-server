export type TUser = {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  password?: string;
  role: 'customer' | 'seller' | 'admin';
  status: 'active' | 'inactive' | 'blocked';
  createdAt?: Date;
  updatedAt?: Date;
};
