import express from 'express';
const productRouters = express.Router();
import { createProduct, deleteproduct, getAllProduct, updateProduct, } from '../../controller/product/productController.js';
import { isUserAuthenticated } from '../../middleware/auth.js';



productRouters
    .get('/', getAllProduct)
    .post('/createproduct', isUserAuthenticated, createProduct)
    .put('/updateproduct/:id', isUserAuthenticated, updateProduct)
    .delete('/deleteproduct/:id', isUserAuthenticated, deleteproduct)







export default productRouters;