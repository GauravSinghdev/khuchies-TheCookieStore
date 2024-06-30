const express = require("express");
const zod = require("zod");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken")
const JWT_SECRET = require("../config");
const router = express.Router();
const bcrypt = require('bcrypt');
const  { authenticateToken } = require("./middleware");


// let isLogin = false; 
// const tokenBlacklist = [];

router.get("/", async (req, res) => {
    res.json({
        error: "This is the api",
    })
})

//zod validation for signup
const registrationSchema = zod.object({
    username: zod.string(),
    phoneNo: zod.string().regex(/^[6-9]\d{9}$/).length(10),
    password: zod.string().min(6),
})
//signup route
router.post("/signup", async (req, res) => {

    try{
        const { success } = registrationSchema.safeParse(req.body);
        console.log(success);
        if (!success) {
            return res.status(400).json({
                error: true,
                message: "Incorrect inputs"
            });
        }

        const { username, phoneNo, password } = req.body;

        const existingPhoneNo = await User.findOne({
            phoneNo: phoneNo
        });

        if (existingPhoneNo) {
            return res.status(409).json({
                error: true,
                message: "Mobile number already exists"
            });
        }    
    
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            phoneNo,
            password: hashedPassword,
        })

        const userId = user._id;

        const token = jwt.sign({ userId }, JWT_SECRET, {
            expiresIn: '24h',
        });

        return res.status(201).json({
            error: false,
            message: "User created successfully!",
            accessToken: token
        })
        }catch(error) {
            console.error(error);
            res.status(500).json({ 
                error: true,
                message: "Internal Server Error",
            });
        }
});


//zod validation for login
const loginSchema = zod.object({
    phoneNo: zod.string().regex(/^[6-9]\d{9}$/).length(10),
    password: zod.string().min(6),
    })


//login routes
router.post("/login", async (req,res) => {
    try {
        const { success } = loginSchema.safeParse(req.body);
        console.log(success);
        if (!success) {
            return res.status(400).json({
                error: true,
                message: "Incorrect inputs"
            });
        }
        const { phoneNo, password } = req.body;

        // Find user by phoneNo or email
        const user = await User.findOne({
            phoneNo: phoneNo
        });

        if(!user)
        {
            return res.status(404).json({
                error: true,
                message: "User not found!"
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
    
        if (!user || !passwordMatch) {
            return res.status(401).json({ 
                error: true,
                message: "Invalid mobile number or wrong password"
            });
        }

        const userId = user._id;

        const token = jwt.sign({ userId }, JWT_SECRET, {
            expiresIn: '24h',
        });

        return res.status(201).json({
            error: false,
            message: "User Logged in successfully!",
            accessToken: token
        })
        }catch(error) {
            console.error(error);
            res.status(500).json({ 
                error: true,
                message: "Internal Server Error",
            });
        }
});

// User details route
router.get("/user-details", authenticateToken, async (req, res) => {

    try {
        const user = req.user; // Directly extract the user object

        // Fetch user from the database
        const foundUser = await User.findById(user.userId);

        if (!foundUser) {
            return res.status(404).json({
                error: true,
                message: "User not found",
            });
        }

        // Respond with user details
        return res.status(200).json({
            user: {
                username: foundUser.username,
                phoneNo: foundUser.phoneNo,
                createdOn: foundUser.createdOn,
            },
            message: "User details retrieved successfully!",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
});

// Delete user route
router.delete("/delete-user", authenticateToken, async (req, res) => {

    try {
        const { userId } = req.user; // Extract userId from the user object

        // Delete user from the database
        const result = await User.deleteOne({ _id: userId });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                error: true,
                message: "User not found",
            });
        }

        // Respond with user details
        return res.status(200).json({
            error: false,
            message: "User deleted successfully!",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
});

module.exports = router;

