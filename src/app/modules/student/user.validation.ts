import Joi from 'joi';

const userNameSchema = Joi.object({
  firstName: Joi.string().required().max(20).trim(),
  lastName: Joi.string().required(),
});

const userAddressSchema = Joi.object({
  street: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
});

const userOrdersSchema = Joi.object({
  productName: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
});

const userValidationSchema = Joi.object({
  userId: Joi.number().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  fullName: userNameSchema.required(),
  age: Joi.number().required(),
  email: Joi.string().email().required(),
  isActive: Joi.boolean(),
  hobbies: Joi.array().items(Joi.string().required()).required().min(1),
  address: userAddressSchema.required(),
  orders: Joi.array().items(userOrdersSchema).optional(),
  isDeleted: Joi.boolean()
});

export default userValidationSchema;
