import asyncHandler from 'express-async-handler';
import { userModel } from '../../model/user/userModel.js';
import ErrorHandler from '../../utils/errorHandler.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userTokenModel } from '../../model/user/userTokenModel.js';
import dotenv from 'dotenv';
dotenv.config();


// Get all users : 
export const getAllUsers = asyncHandler(async (req, res, next) => {

    const getAllUsers = await userModel.find();
    if (getAllUsers.length === 0) {
        next(new ErrorHandler('No user found', 400))
    } else {
        res.status(200).json({ "message": getAllUsers });
    }
});

// Create user : 
export const createUser = asyncHandler(async (req, res, next) => {

    const { firstname, lastname, email, mobile_no, password } = req.body;

    const findExistEmail = await userModel.findOne({ email: email });
    const findExistMobileNumber = await userModel.findOne({ mobile_no: req.body.mobile_no });

    if (findExistEmail) {
        return next(new ErrorHandler('Email is already in use!', 400));
    } else if (findExistMobileNumber) {
        return next(new ErrorHandler('Mobile number is already in use!', 400));
    } else {
        const genSalt = await bcrypt.genSalt(10);
        const hashedPassWord = await bcrypt.hash(password, genSalt);

        const createUser = new userModel({
            firstname,
            lastname,
            email,
            mobile_no,
            password: hashedPassWord
        });
        await createUser.save();
        return res.status(200).json({ message: 'User has been registered!' });
    }

});

// Login user : 
export const loginUser = asyncHandler(async (req, res, next) => {

    const { email, password } = req.body;

    const verifiedUser = await userModel.findOne({ email: email });

    if (!verifiedUser) {
        return next(new ErrorHandler('Invalid authentication!', 400));
    } else {

        const matchPassword = await bcrypt.compare(password, verifiedUser.password);

        if (matchPassword) {

            const accessToken = jwt.sign(verifiedUser.toJSON(), process.env.ACCESS_TOKEN, { expiresIn: '10m' });
            const refreshToken = jwt.sign(verifiedUser.toJSON(), process.env.REFRESH_TOKEN);

            const token = new userTokenModel({
                token: accessToken
            });
            await token.save();
            return res.status(200).json({ message: 'success', myAccessToken: accessToken, myRefreshToken: refreshToken, email: verifiedUser.email, mobile_no: verifiedUser.mobile_no })
        } else {
            return next(new ErrorHandler('Invalid authentication!', 400));
        }
    }
});


// Update user : 
export const updateUser = asyncHandler(async (req, res, next) => {

    const { id } = req.params;

    await userModel.findByIdAndUpdate({ _id: id }, req.body, { new: true });
    return res.status(200).json({ message: 'User has been updated', success: true });

});

// Delete user : 
export const deleteUser = asyncHandler(async (req, res, next) => {

    const { id } = req.params;

    await userModel.findByIdAndDelete({ _id: id });
    return res.status(200).json({ message: 'User has been removed', success: true });
});
