const express = require('express');
const router = express.Router();
const productController = require('../controller/ProductController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');
const ProductController = require('../controller/ProductController');


router.post('/createProduct', authMiddleware, adminMiddleware, ProductController.createProduct); 
router.get('/getProduct', authMiddleware, productController.getAllProducts); 
router.put('/updateProduct/:id', authMiddleware, adminMiddleware, productController.updateProduct); 
router.delete('/deleteProduct/:id', authMiddleware, adminMiddleware, productController.deleteProduct);  

module.exports = router;
