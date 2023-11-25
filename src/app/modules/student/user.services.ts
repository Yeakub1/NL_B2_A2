import { User } from '../user.modle';
import { Users } from './user.interface';

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

const getSingleUserDB = async (id: string) => {
  const result = await User.findOne({ id });
  return result;
};

const deleteUserDB = async (id: string) => {
  const result = await User.updateOne({ id }, { isDeleted: true });
  return result;
};

export const studentServices = {
  createUserDB: createUsersDB,
  getAllStudentDB: getAllUsersDB,
  getSingleStudentFromDB: getSingleUserDB,
  deleteStudentFromDB: deleteUserDB,
};
