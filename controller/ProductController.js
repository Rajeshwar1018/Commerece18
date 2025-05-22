const ProductService = require('../service/ProductService');

class ProductController {
  
  async createProduct(req, res) {
    try {
      const user = req.user;  // This is set by the auth middleware
      const product = await ProductService.createProduct(req.body, user);
      res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

 
  async getAllProducts(req, res) {
  try {
    const products = await ProductService.getAllProduct();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }}


  async updateProduct(req, res) {
    try {
      const user = req.user;  // This is set by the auth middleware
      const product = await ProductService.updateProduct(req.params.id, req.body, user);
      res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      const product = await ProductService.deleteProduct(req.params.id);
      res.status(200).json({ message: 'Product deleted successfully', product });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new ProductController();
