const Product = require('../Models/Product');

class ProductService {
 
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

  
  async getAllProduct(filters, page, limit = 10) {
    try {
      const { category, minPrice, maxPrice, search, sortBy } = filters;
      const query = {};
      
      if (category) {
        query.category = category;
      }
      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = parseFloat(minPrice);
        if (maxPrice) query.price.$lte = parseFloat(maxPrice);
      }
      if (search) {
        query.name = { $regex: search, $options: 'i' };
      }

      const skip = (page - 1) * limit;
      let sortCriteria = {};
      if (sortBy === 'LowToHigh') {
        sortCriteria = { price: 1 };
      } else if (sortBy === 'HighToLow') {
        sortCriteria = { price: -1 };
      } else {
        sortCriteria = { createdAt: -1 };
      }

      const productDetails = await Product.find(query)
        .skip(skip)
        .limit(limit)
        .sort(sortCriteria);

      return productDetails;
    } catch (error) {
      console.error("Error in getting product: ", error);
      throw new Error(error);
    }
  }


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
