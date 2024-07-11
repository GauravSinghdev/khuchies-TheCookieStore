const express = require("express");
const zod = require("zod");
const { Product } = require("../models/product");
const jwt = require("jsonwebtoken")
const JWT_SECRET = require("../config");
const router = express.Router();
const bcrypt = require('bcrypt');
const  { authenticateToken } = require("./middleware");


router.get("/", async (req, res) => {
    res.json({
        error: "This is the admin api. . .",
    })
})

//Get all the products
router.get("/all-products-details", authenticateToken, async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json({
            error: false,
            message: "All Product details retreived successfully!",
            products
        });
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.message
        });
    }
})

//Add the Product route
router.post("/add-newproduct", authenticateToken, async (req, res) => {
    try{
        const { Product_name, Product_code, Product_imgURL, Product_SP, Product_MRP, Product_discount } = req.body;

        // return res.json({
        //     Product_name, Product_code
        // })

        const productName = await Product.findOne({
            product_name : Product_name
        });

        const productCode = await Product.findOne({
            product_code : Product_code
        });

        if(productCode || productName){
            return res.status(409).json({
                error: true,
                message: "Product already present"
            })
        }

        const product = await Product.create({
            product_name : Product_name,
            product_code : Product_code,
            product_imageURL : Product_imgURL,
            product_SP : Product_SP,
            product_MRP : Product_MRP,
            product_discount : Product_discount
        })

        return res.status(201).json({
            error: false,
            message: "New Product details added successfully!",
            product
        });
    } catch(err) {
        res.status(500).json({
            status: "status-500",
            error: true,
            message: err.message
        });
    }
})

//Delete the Product route
router.delete("/delete-product/:productId", authenticateToken, async (req, res) => {
    const productId = req.params.productId;
    
    try {
        const product = await Product.findOne({
            _id: productId,
        });

        if (!product) {
            return res.status(404).json({
                error: true,
                message: "Product not found",
            });
        }

        await Product.deleteOne({
            _id: productId,
        });

        return res.json({
            error: false,
            message: "Product deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
});

//Edit the Product route
router.put("/edit-product/:productId" , authenticateToken, async (req, res) => {
    const productId = req.params.productId;
    const { Product_name, Product_code, Product_imgURL, Product_SP, Product_MRP, Product_discount } = req.body;
    try{
        const product = await Product.findOne({
            _id: productId,
        });

        if (!product) {
            return res.status(404).json({
                error: true,
                message: "Product not found",
            });
        }

        try{

            product.product_name = Product_name;
            product.product_code = Product_code;
            product.product_imageURL = Product_imgURL;
            product.product_SP = Product_SP;
            product.product_MRP = Product_MRP;
            product.product_discount = Product_discount;

            await product.save();

            return res.status(201).json({
                error: false,
                product,
                message: "Product is updated successfully",
            });
        } catch(err){
            return res.status(404).json({
                error: true,
                message: "Product already present. Product name and code should be unique.",
            });
        }
    } catch(err){
        res.status(500).json({
            error: true,
            message: "Internal server error.",
        });
    }
})

module.exports = router;