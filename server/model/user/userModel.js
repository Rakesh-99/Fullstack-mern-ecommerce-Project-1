import mongoose from "mongoose";





const userSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    mobile_no: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true
    },

});



export const userModel = mongoose.model('User', userSchema);