const mongoose = require('mongoose');

// Load environment variables from .env file
require('dotenv').config(); 

// MongoDB Connection String
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI); //mongoURI should be like this--- "mongodb://localhost:27017/table"

// Schema for Cart
const cartItemSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true 
    },
    productId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', 
        required: true 
    },
    quantity: { 
        type: Number, 
        default: 1 
    },
  addedAt: { 
    type: Date, 
    default: Date.now 
    },
});

// model from the schema
const Cart = mongoose.model('Cart', cartItemSchema);

module.exports = {
	Cart,
};
