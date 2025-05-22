const Cart = require('../models/Cart')

class CartService {
  async getCart(userId) {
    try {
      const cart = await Cart.findOne({ user: userId }).populate('products.productId');
      if (!cart) throw new Error('Cart not found');
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async addToCart(userId, products) {
    try {
      let cart = await Cart.findOne({ user: userId });

      if (!cart) {
        cart = new Cart({ user: userId, products: [] });
      }

      products.forEach((item) => {
        const { productId, quantity } = item;
        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

        if (productIndex > -1) {
          cart.products[productIndex].quantity += quantity;
        } else {
          cart.products.push({ productId, quantity });
        }
      });

      return await cart.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateCart(userId, products) {
    try {
      let cart = await Cart.findOne({ user: userId });

      if (!cart) {
        throw new Error("Cart not found");
      }

      products.forEach((item) => {
        const { productId, quantity } = item;
        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

        if (productIndex > -1) {
          cart.products[productIndex].quantity = quantity;
        } else {
          cart.products.push({ productId, quantity });
        }
      });

      return await cart.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async clearCart(userId) {
    try {
      await Cart.findOneAndDelete({ user: userId });
      return { message: "Cart cleared successfully" };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new CartService();
