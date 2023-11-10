import express from 'express';
const userRouter = express.Router();
import { createUser, deleteUser, getAllUsers, loginUser, updateUser } from '../../controller/user/userController.js';





userRouter.get('/', getAllUsers)
    .post('/register', createUser)
    .post('/login', loginUser)
    .put('/update/:id', updateUser)
    .delete('/delete/:id', deleteUser)





export default userRouter;