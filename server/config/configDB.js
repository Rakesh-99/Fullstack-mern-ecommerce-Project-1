import mongoose from "mongoose";
import asyncHandler from 'express-async-handler';





const connectDB = asyncHandler(async (connectionString) => {


    await mongoose.connect(connectionString);
    console.log('DB connected successfully');

});



export default connectDB;