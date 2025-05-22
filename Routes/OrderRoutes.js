const express = require("express");
const router = express.Router();
const OrderController = require("../controller/OrderController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/create", authMiddleware, OrderController.createOrder);
router.put("/update/:id", authMiddleware, OrderController.updateOrder);
router.delete("/delete/:id", authMiddleware, OrderController.deleteOrder);
router.get("/getbyId/:id", authMiddleware, OrderController.getOrderById);
router.get("/getAll", authMiddleware, OrderController.getAllOrders);

module.exports = router;
