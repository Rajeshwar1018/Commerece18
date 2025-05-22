const OrderService = require("../service/OrderService");

class OrderController {
  async createOrder(req, res) {
    try {
      const userId = req.user;
      const order = await OrderService.createOrder(req.body, userId);
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateOrder(req, res) {
    try {
      const orderId = req.params.id;
      const userId = req.user;
      const updatedOrder = await OrderService.updateOrder(orderId, req.body, userId);
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteOrder(req, res) {
    try {
      const orderId = req.params.id;
      const userId = req.user;
      const cancelledOrder = await OrderService.deleteOrder(orderId, userId);
      res.status(200).json(cancelledOrder);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getOrderById(req, res) {
    try {
      const orderId = req.params.id;
      const order = await OrderService.getOrderById(orderId);
      res.status(200).json(order);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async getAllOrders(req, res) {
    try {
      const orders = await OrderService.getAllOrders();
      res.status(200).json(orders);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
}

module.exports = new OrderController();
