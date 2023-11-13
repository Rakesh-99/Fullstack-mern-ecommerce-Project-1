import { productModel } from '../../model/product/productModel.js';
import asyncHandler from 'express-async-handler';
import ErrorHandler from '../../utils/errorHandler.js';



// Get all products : 
export const getAllProduct = asyncHandler(async (req, res, next) => {

    const queryData = {};


    // Searching product api : 
    const searchByName = req.query.search || '';          // Query for searching product 

    if (searchByName) {
        queryData.name = {
            $regex: searchByName,
            $options: 'i'
        }
    }


    // Filter product by category :
    const category = req.query.category || 'All';    // Query for filtering the Category
    if (category !== 'All') {
        queryData.category = category;
    }

    // Filter product by price :

    const minPrice = parseInt(req.query.minPrice) || 0;
    const maxPrice = parseInt(req.query.maxPrice) || Number.MAX_SAFE_INTEGER;

    if (minPrice !== 0 || maxPrice !== Number.MAX_SAFE_INTEGER) {

        queryData.price = {
            $gte: minPrice,
            $lte: maxPrice
        }
    }


    // Pagination api :

    const page = parseInt(req.query.page) || 1;
    const showProductPerPage = 3;
    const totalProducts = await productModel.countDocuments();
    const totalPages = Math.ceil(totalProducts / showProductPerPage);

    if (page > totalPages) {
        return next(new ErrorHandler('No page found!', 400));
    }

    try {

        const getAllProducts = await productModel.find(queryData)
            .skip((page - 1) * showProductPerPage)
            .limit(showProductPerPage)
            .exec();

        return res.status(200).json({ success: true, message: 'Product has been fetched', products: getAllProducts.length > 0 ? getAllProducts : 'No product found' });

    } catch (error) {
        return next(new ErrorHandler('Internal Server Error', 500));
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