import { Request, Response } from 'express';
import { studentServices } from './user.services';
// import userValidationSchema from './user.validation';

// const createUsers = async (req: Request, res: Response) => {
//   try {
//     const { student: studentData } = req.body;
//     const { error, value } = userValidationSchema.validate(studentData);
//     const result = await studentServices.createStudentIntoDB(value);

//     if (error) {
//       res.status(500).json({
//         success: false,
//         message: 'something worng',
//         error: error.details,
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: 'User created successfully!',
//       data: result,
//     });
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message || 'something worng',
//       error: error,
//     });
//   }
// };

const createUsers = async (req: Request, res: Response) => {
  try {
    const value = req.body;
    const result = await studentServices.createUserDB(value);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const getAllUsersData = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudentDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something worng',
      error: error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Single User fetch Successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.deleteStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Single deleted Successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: error,
    });
  }
};

export const usersController = {
  createUser: createUsers,
  getAllUsers: getAllUsersData,
  getSingleUser: getSingleUser,
  deleteUser: deleteUser,
};
