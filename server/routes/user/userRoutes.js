import express from 'express';
const userRouter = express.Router();
import { createUser, deleteUser, getAllUsers, loginUser, updateUser, logOutUser } from '../../controller/user/userController.js';





userRouter.get('/', getAllUsers)
    .post('/register', createUser)
    .post('/login', loginUser)
    .put('/update/:id', updateUser)
    .delete('/delete/:id', deleteUser)
    .get('/logout', logOutUser)





export default userRouter;