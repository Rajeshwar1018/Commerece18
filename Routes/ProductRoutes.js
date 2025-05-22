const express = require('express');
const router = express.Router();
const productController = require('../controller/ProductController');
const authMiddleware = require('../middlewares/authMiddleware');
const ProductController = require('../controller/ProductController');


router.post('/createProduct', authMiddleware, ProductController.createProduct); 
router.get('/getProduct', authMiddleware, productController.getAllProducts); 
router.put('/updateProduct/:id',authMiddleware, productController.updateProduct); 
router.delete('/deleteProduct/:id',authMiddleware, productController.deleteProduct);  

module.exports = router;