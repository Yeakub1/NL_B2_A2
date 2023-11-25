import express from 'express';
import { usersController } from './user.controller';

const router = express.Router();

router.post('/users', usersController.createUser);
router.get('/users', usersController.getAllUsers);
router.get('/users/:userId', usersController.getSingleUser);
router.delete('/users/:userId', usersController.deleteUser);

export const UserRoute = router;
