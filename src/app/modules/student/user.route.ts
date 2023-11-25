import express from 'express';
import { usersController } from './user.controller';

const router = express.Router();

router.post('/users', usersController.createUser);
router.get('/users', usersController.getAllUsers);
router.get('/users/:userId', usersController.getSingleUser);
router.delete('/users/:userId', usersController.deleteUser);
router.put('/users/:userId', usersController.updateUser);
router.put('/users/:userId/orders', usersController.userOrders);
router.get('/users/:userId/orders', usersController.getSingleUserOrdrs);
router.get('/users/:userId/orders/total-price', usersController.getUserTotalPrice,
);

export const UserRoute = router;
