import express from 'express';
const userRouter = express.Router();
import { createUser, deleteUser, getAllUsers, loginUser, updateUser, logOutUser, forgetPassword, resetPassword } from '../../controller/user/userController.js';





userRouter.get('/', getAllUsers)
    .post('/register', createUser)
    .post('/login', loginUser)
    .put('/update/:id', updateUser)
    .delete('/delete/:id', deleteUser)
    .get('/logout', logOutUser)
    .post('/forget-password', forgetPassword)
    .get('/reset-password/:id/:token', resetPassword)





export default userRouter;