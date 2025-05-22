const Product = require('../Models/Product');

class ProductService 
{
 
  async createProduct(details, user) {
    const { name, description, price, category } = details;
    try {
      const productDetails = new Product({
        name,
        description,
        price,
        category,
        createdBy: user.id,
        updatedBy: user.id
      });

      const insertProduct = await productDetails.save();
      return insertProduct;
    } catch (error) {
      console.error("Error in creating product: ", error);
      throw new Error(error);
    }
  }

  async getAllProduct() {
  try {
    const productDetails = await Product.find().sort({ createdAt: -1 });
    return productDetails;
  } catch (error) {
    console.error("Error in getting product: ", error);
    throw new Error(error.message);
  }}

  async updateProduct(id, updateData, user) {
    try {
      updateData.updatedBy = user.id;
      const productDetails = await Product.findOneAndUpdate({ _id: id }, updateData, { new: true });

      if (!productDetails) {
        throw new Error(`Product with ID ${id} not found`);
      }

      return productDetails;
    } catch (error) {
      console.error("Error in updating product: ", error);
      throw new Error(error);
    }
  }

  
  async deleteProduct(id) {
    try {
      const productDetails = await Product.findOneAndDelete({ _id: id });
      if (!productDetails) {
        throw new Error(`Product with ID ${id} not found`);
      }

      return productDetails;
    } catch (error) {
      console.error("Error in deleting product: ", error);
      throw new Error(error);
    }
  }
}

module.exports = new ProductService();
