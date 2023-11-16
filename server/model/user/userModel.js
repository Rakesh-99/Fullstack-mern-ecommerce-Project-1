import mongoose from "mongoose";
import validator from 'validator';




const userSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: true,
        trim: true,
        minLength: [4, 'First name should contain minimum 4 characters!'],
        maxLength: [30, 'First name should contain maximum 30 characters!']
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        minLength: [4, 'Last name should contain minimum 4 characters!'],
        maxLength: [30, 'Last name should contain maximum 30 characters!']
    },
    email: {
        type: String,
        required: [true, 'Enter your email!'],
        trim: true,
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email!']
    },
    password: {
        type: String,
        required: true,
        minLength: [6, 'Password should contain at least 6 characters!'],
    },
    avatar: {

        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user"
    }

});



export const userModel = mongoose.model('User', userSchema);