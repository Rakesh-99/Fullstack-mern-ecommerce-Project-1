import { productModel } from '../../model/product/productModel.js';
import asyncHandler from 'express-async-handler';
import ErrorHandler from '../../utils/errorHandler.js';



// Get all products : 
export const getAllProduct = asyncHandler(async (req, res, next) => {

    // Searching product api : 
    const search = req.query.keyword || '';

    const queryData = {
        name: { $regex: search, $options: 'i' }
    }

    const getAllProducts = await productModel.find(queryData);

    if (getAllProducts.length === 0) {
        return next(new ErrorHandler('No product found!', 400));
    } else {
        return res.status(200).json({ success: true, message: getAllProducts })
    }

});



// Create product :
export const createProduct = asyncHandler(async (req, res, next) => {

    const createNewProduct = await productModel.create(req.body);
    res.status(200).json({ success: true, message: 'Product has been registered!', product: createNewProduct });
});



// Update product :
export const updateProduct = asyncHandler(async (req, res, next) => {

    const { id } = req.params;
    const updateProduct = await productModel.findByIdAndUpdate({ _id: id }, req.body, { new: true });
    res.status(200).json({ success: true, message: 'Product has been updated!', updatedProduct: updateProduct });
});



// Delete product :

export const deleteproduct = asyncHandler(async (req, res, next) => {

    const { id } = req.params;
    await productModel.findByIdAndDelete({ _id: id });
    return res.status(200).json({ success: true, message: 'User has been deleted!' });

});