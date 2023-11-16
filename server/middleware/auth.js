import asyncHandler from 'express-async-handler';
import ErrorHandler from '../utils/errorHandler.js';
import { userModel } from '../model/user/userModel.js';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();



// Verifying accessToken : 

export const isUserAuthenticated = asyncHandler(async (req, res, next) => {

    const { accessToken } = req.cookies;

    if (!accessToken || accessToken === 'j:null') {
        return next(new ErrorHandler('You need to login to perform this operation', 401));

    } else {

        try {
            const verifyingAccessToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN);
            req.user = await userModel.findById(verifyingAccessToken.id);
            next();

        } catch (error) {

            if (error.name === 'JsonWebTokenError') {
                return next(new ErrorHandler('Invalid token', 401));
            } else if (error.name === 'TokenExpiredError') {
                return next(new ErrorHandler('Token has expired', 401));
            } else {
                return next(new ErrorHandler('Authentication failed', 401));
            }
        }
    }
});