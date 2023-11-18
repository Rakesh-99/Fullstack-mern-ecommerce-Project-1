import express from 'express';
const productRouters = express.Router();
import { createProduct, deleteproduct, getAllProduct, updateProduct, } from '../../controller/product/productController.js';
import { isUserAuthenticated, userRole } from '../../middleware/auth.js';


productRouters
    .get('/', isUserAuthenticated, getAllProduct)
    .post('/createproduct', isUserAuthenticated, userRole("admin"), createProduct)
    .put('/updateproduct/:id', isUserAuthenticated, userRole("admin"), updateProduct)
    .delete('/deleteproduct/:id', isUserAuthenticated, userRole("admin"), deleteproduct)







export default productRouters;