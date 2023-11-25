import { Model } from 'mongoose';

export type UserName = {
  firstName: string;
  lastName: string;
};

export type UserAddress = {
  street: string;
  city: string;
  country: string;
};
export type UserOrders = {
  productName: string;
  price: number;
  quantity: number;
};

export type Users = {
  userId: number;
  username: string;
  password: string;
  fullName: UserName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: [string];
  address: UserAddress;
  orders: UserOrders[];
  isDeleted: boolean;
};

// for carating static
export interface userModle extends Model<Users> {
  // eslint-disable-next-line no-unused-vars
  isUserExits(id: string): Promise<Users | null>;
}
