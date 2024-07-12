const mongoose = require('mongoose');

// Load environment variables from .env file
require('dotenv').config(); 

// MongoDB Connection String
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI); //mongoURI should be like this--- "mongodb://localhost:27017/table"

// Schema for Cart
const wishListSchema  = new mongoose.Schema({
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
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// model from the schema
const Wishlist = mongoose.model('Wishlist', wishListSchema);

module.exports = {
	Wishlist,
};
