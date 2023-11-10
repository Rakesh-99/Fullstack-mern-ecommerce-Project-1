import express from 'express';
const productRouters = express.Router();
import { createProduct, deleteproduct, getAllProduct, updateProduct } from '../../controller/product/productController.js';






productRouters
    .get('/', getAllProduct)
    .post('/createproduct', createProduct)
    .put('/updateproduct/:id', updateProduct)
    .delete('/deleteproduct/:id', deleteproduct)






export default productRouters;