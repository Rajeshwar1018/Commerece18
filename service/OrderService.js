const Order = require("../Models/Order");
const Product = require("../models/Product");
const mongoose = require("mongoose");

class OrderService {
  async createOrder(details, userId) {
    const { products } = details;
    try {
      const totalAmount = await this.calculateOrderAmount(products);
      const order = new Order({
        userId: userId.id,
        products,
        totalAmount,
        status: "pending",
      });
      return await order.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async calculateOrderAmount(products) {
    let subtotal = 0;
    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }
      subtotal += item.quantity * product.price;
    }
    return subtotal;
  }

  async updateOrder(orderId, updateData, userId) {
    try {
      updateData.updatedBy = userId.id;
      const updatedOrder = await Order.findByIdAndUpdate(orderId, updateData, {
        new: true,
      });
      if (!updatedOrder) {
        throw new Error(`Order with ID ${orderId} not found`);
      }
      return updatedOrder;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteOrder(orderId, userId) {
    try {
      const updateData = {
        status: "cancelled",
        updatedBy: userId.id,
      };
      const deletedOrder = await Order.findByIdAndUpdate(orderId, updateData, {
        new: true,
      });
      if (!deletedOrder) {
        throw new Error(`Order with ID ${orderId} not found`);
      }
      return deletedOrder;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getOrderById(orderId) {
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        throw new Error(`Order with ID ${orderId} not found`);
      }
      return order;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllOrders() {
    try {
      const orders = await Order.find();
      if (orders.length === 0) {
        throw new Error("No orders found");
      }
      return orders;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new OrderService();
