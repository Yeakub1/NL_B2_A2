import { Schema, model } from 'mongoose';
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
  firstName: {type: String},
  lastName: {type: String},
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
    type: Boolean
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

userSchema.methods.toJSON = function () {
  try {
    const obj = this.toObject();
    delete obj.password;
    delete obj._id;
    delete obj.__v;
    return obj;
  } catch (error) {
    throw new Error(`${error}`);
  }
};




// creating a cousto intance method
// userSchema.statics.isUserExits = async function (userId: number) {
//   const existingUser = await User.findOne({ userId });
//   return existingUser;
// };

export const User = model<Users, userModle>('User', userSchema);
