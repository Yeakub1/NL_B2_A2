import { Schema, model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import {
  Users,
  UserName,
  userModle,
  UserAddress,
  UserOrders,
} from './student/user.interface';
import isEmail from 'validator/lib/isEmail';
import config from '../config';

const userNameSchema = new Schema<UserName>({
  fristName: {
    type: String,
    // required: [true, 'Frist Name is Required'],
    // maxlength: [20, 'FristName can not be more then 20 careacters'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is Required'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
    },
    maxlength: [20, 'LastName can not be more then 20 careacters'],
    message: '{VALUE} is not valid',
  },
});

const UserAddressSchema = new Schema<UserAddress>({
  country: { type: String, trim: true },
  city: { type: String, trim: true },
  street: { type: String, trim: true },
});

const UserOrdersSchema = new Schema<UserOrders>({
  productName: { type: String, required: true, trim: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const userSchema = new Schema<Users, userModle>({
  userId: { type: Number, required: true, unique: true, trim: true },
  username: { type: String, required: true, unique: true, trim: true },
  password: {
    type: String,
    required: [true, 'password is requird'],
    maxlength: [20, 'password can be more then 20 character'],
    trim: true,
  },
  fullName: { type: userNameSchema },
  age: { type: Number, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => isEmail(value),
      message: '{VALUE} is not type a email',
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },

  hobbies: { type: [String] },
  address: {
    type: UserAddressSchema,
    required: true,
  },
  orders: [{ type: UserOrdersSchema }],
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// pre save middleware/hook
userSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook: we will save to data');

  // hassing password and save on DB
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

// post save middleware/hook
userSchema.post('save', function (doc, next) {
  console.log('post hook: we will after to the save data');
  doc.password = '';
  next();
});

// Query Middleware
userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// creating a cousto intance method
// userSchema.statics.isUserExits = async function (userId: number) {
//   const existingUser = await User.findOne({ userId });
//   return existingUser;
// };

export const User = model<Users, userModle>('User', userSchema);
