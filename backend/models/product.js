const mongoose = require('mongoose');

// Load environment variables from .env file
require('dotenv').config(); 

// MongoDB Connection String
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI); //mongoURI should be like this--- "mongodb://localhost:27017/table"

// Schema for Products
const productSchema = new mongoose.Schema({
    product_name : {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 5,
        maxLength: 50
    },
    product_code : {
        type: String,
        unique: true,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 5
    },
    product_imageURL : {
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    },
    product_SP : {
        type: Number,
        required: true,
        trim: true,
        maxLength: 20
    },
    product_MRP : {
        type: Number,
        required: true,
        trim: true,
        maxLength: 20
    },
    product_discount : {
        type: Number,
        trim: true,
        maxLength: 20
    },
    createdOn: { 
        type: Date, 
        default: new Date().getTime()
    },

});


// model from the schema
const Product = mongoose.model('Product', productSchema);

module.exports = {
	Product,
};