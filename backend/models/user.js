
const mongoose = require('mongoose');

// Load environment variables from .env file
require('dotenv').config(); 

// MongoDB Connection String
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI); //mongoURI should be like this--- "mongodb://localhost:27017/table"

// Schema for Users
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    phoneNo: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    role:{
        type: String,
        required: true,
    },
    addLine1: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30
    },
    addLine2: {
        type: String,
        trim: true,
        maxLength:30
    },
    city: {
        type: String,
        required: true,
    },
    createdOn: { 
        type: Date, 
        default: new Date().getTime()
    },
});


// model from the schema
const User = mongoose.model('User', userSchema);

module.exports = {
	User,
};
