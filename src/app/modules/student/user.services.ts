import { User } from '../user.modle';
import { UserOrders, Users } from './user.interface';

// const createUsersDB = async (studentData: Users) => {
//   // if (await User.isUserExits(studentData.userId)) {
//   //   throw new Error('User Already Exsist');
//   // }

//   const result = await User.create(studentData); //build in static method
//   // const student = new Student(studentData); //create an a instance
//   // if (await student.isUserExits(studentData.id)) {
//   //   throw new Error("User Already Exsist")
//   // }
//   // const result = await student.save(); // built in instnce method
//   return result;
// };

const createUsersDB = async (user: Users) => {
  const result = await User.create(user);
  return result;
};

const getAllUsersDB = async () => {
  const result = await User.find();
  return result;
};

const getSingleUserDB = async (userId: number) => {
  const result = await User.findOne({ userId });
  return result;
};

const deleteUserDB = async (userId: number) => {
  const result = await User.updateOne({ userId }, { isDeleted: true });
  return result;
};


const updateUserInToDb = async (updatedData: Users, id: number) => {
  const {
    userId,
    email,
    username,
    password,
    fullName: { firstName, lastName },
    age,
    isActive,
    hobbies,
    address: { street, city, country },
  } = updatedData;

  await User.updateOne(
    { userId: id },
    {
      $set: {
        userId,
        email,
        username,
        password,
        fullName: { firstName, lastName },
        age,
        isActive,
        hobbies,
        address: { street, city, country },
      },
    },
  );
  const updateUser = await User.findOne({ userId: id });
  return updateUser;
};

const userOrdersCreateInToDb = async (newOrder: UserOrders, id: number) => {
  const result = await User.updateOne(
    { userId: id },
    {
      $push: {
        orders: {
          $each: [newOrder],
        },
      },
    },
  );
  return result;
};

const getUserOrders = async (userId: number) => {
  const result = await User.findOne({ userId: userId }, { orders: 1 });
  if (!result) {
    throw new Error('user not found');
  }
  return result;
};

const userAllOrderPrice = async (userId: number) => {
  const result = await User.findOne({ userId });
  if (!result || !result.orders) {
    throw new Error('user not found');
  }
  // Calculate total price
  const totalPrice = result.orders.reduce((total, order) => {
    const totalOrderPrice = order.price * order.quantity;
    return total + totalOrderPrice;
  }, 0);

  return totalPrice;
};


export const UserServices = {
  createUserDB: createUsersDB,
  getAllUsers: getAllUsersDB,
  getSingleUser: getSingleUserDB,
  deleteUser: deleteUserDB,
  updateUser: updateUserInToDb,
  userOrders: userOrdersCreateInToDb,
  getUserOrders,
  userAllOrderPrice,
};
