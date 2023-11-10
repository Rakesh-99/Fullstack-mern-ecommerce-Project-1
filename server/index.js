import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 8000
import userRouter from './routes/user/userRoutes.js';
import connectDB from './config/configDB.js';
const DB_URI = process.env.DB_URI;
import error from './middleware/error.js';
import productRouters from './routes/product/productRouters.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/user', userRouter);
app.use('/product', productRouters);
app.use(error);







app.listen(PORT, () => {
    console.log(`App is listening on PORT http://localhost:${PORT}`);
});

connectDB(DB_URI);
