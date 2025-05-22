
const mongoose = require('mongoose');

const cartSchema = mongoose.Schema ({
    user: { 
        type: mongoose.Schema.Types.ObjectId
    },
    products: [
        {
        productId: { 
            type: mongoose.Schema.Types.ObjectId,
            required: true 
        },
        quantity: { 
            type: Number, 
            required: true 
        },
        }
    ],
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
})

const Cart = mongoose.model('Cart',cartSchema)

module.exports = Cart
