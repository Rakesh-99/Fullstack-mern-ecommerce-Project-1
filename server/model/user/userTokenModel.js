import mongoose from "mongoose";




const userTokenSchema = new mongoose.Schema({

    token: {
        type: String,
        required: true
    }
});


export const userTokenModel = new mongoose.model('userTokenModel', userTokenSchema);