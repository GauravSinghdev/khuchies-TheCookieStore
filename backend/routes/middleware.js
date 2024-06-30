const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");

function authenticateToken(req, res, next){
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            error: true,
            token,
            message: "Access token is missing",
        });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            // Handle specific error types (e.g., token expired)
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({
                    error: true,
                    message: "Token expired",
                });
            }
            return res.status(401).json({
                error: true,
                message: "Invalid token",
            });
        }
        req.user = user; // Attach user to request
        next(); // Proceed to the next middleware
    });
}

module.exports = {
    authenticateToken,
};