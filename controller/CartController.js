const CartService = require('../service/CartService');

class CartController {
  async getCart(req, res) {
    try {
      const userId = req.user.id;
      const cart = await CartService.getCart(userId);
      res.status(200).json(cart);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async addToCart(req, res) {
    try {
      const userId = req.user.id;
      const products = req.body.products;

      if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ message: "Products array is required" });
      }

      const cart = await CartService.addToCart(userId, products);
      res.status(200).json({ message: "Products added to cart", cart });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateCart(req, res) {
    try {
      const userId = req.user.id;
      const products = req.body.products;

      if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ message: "Products array is required" });
      }

      const cart = await CartService.updateCart(userId, products);
      res.status(200).json({ message: "Cart updated", cart });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async clearCart(req, res) {
    try {
      const userId = req.user.id;
      const result = await CartService.clearCart(userId);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new CartController();
