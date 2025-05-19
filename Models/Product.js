const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
  },
  { timestamps: true } 
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
