const express = require('express');
const router = express.Router();
const CartController = require('../controller/CartController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/get', CartController.getCart);
router.post('/add', CartController.addToCart);
router.put('/update', CartController.updateCart);
router.delete('/clear', CartController.clearCart);

module.exports = router;
