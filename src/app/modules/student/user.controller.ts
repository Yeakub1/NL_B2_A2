import { Request, Response } from 'express';
import { UserServices } from './user.services';
import { Users } from './user.interface';
import userValidationSchema from './user.validation';

// new user create
const createUsers = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const { error } = userValidationSchema.validate(userData);
    if (error) {
      return res.status(500).json({
        success: false,
        message: 'User creation not successful',
        error: error.details,
      });
    }

    const result = await UserServices.createUserDB(userData);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

// single user data fetch
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const result = await UserServices.getSingleUser(userId);
    if (result) {
      res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: result,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// all users data fetch
const getAllUsersData = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsers();
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

// user delete
const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId: number = Number(req.params.userId);
    const result = await UserServices.deleteUser(userId);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: result.upsertedId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: error,
    });
  }
};


// user data update
const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const updatedData: Users = req.body;
    const id = Number(req.params.userId);
    const result = await UserServices.updateUser(updatedData, id);
    res.status(200).json({
      success: true,
      message: 'User Data Updated succesfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const getSingleUserOrdrs = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const result = await UserServices.getUserOrders(userId); //getOrdersOfSingleUserFromDb(userId)
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderId = Number(req.params.userId);
    const newOrder = req.body;
    await UserServices.userOrders(newOrder, orderId);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const getUserTotalPrice = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const result = await UserServices.userAllOrderPrice(userId);
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice: result,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

export const usersController = {
  createUser: createUsers,
  getAllUsers: getAllUsersData,
  getSingleUser: getSingleUser,
  deleteUser: deleteUser,
  updateUser: updateSingleUser,
  userOrders: createOrder,
  getSingleUserOrdrs,
  getUserTotalPrice,
};
