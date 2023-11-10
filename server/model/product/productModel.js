import mongoose from 'mongoose';



const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: [true, 'Please enter the product name!']
    },
    description: {
        type: String,
        required: [true, 'Please enter the product description!'],
    },
    price: {
        type: Number,
        required: [true, 'Please enter the product price!']
    },
    rating: {
        type: Number,
        default: 0,

    },
    category: {
        type: String,
        required: [true, 'Category is required!']
    },
    stock: {
        type: Number,
        default: 1,
        maxLength: [3, 'Stock can not exceed more than 4 characters!']
    },
    image: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    numOfReview: {
        type: Number,
        default: 0
    },
    review: [
        {
            name: {
                type: String,
                required: [true, 'Name is required for the review!']
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }

});

export const productModel = new mongoose.model('Product', productSchema);
