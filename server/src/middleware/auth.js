// middleware/auth.js
const jwt = require('jsonwebtoken');
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json("Please login first");
    }
  }

  if (!token) {
    res.status(401).json("Please login first");
  }
});

// Middleware function to authorize admin access
function authorizeAdmin(req, res, next) {
  if (req.user.role !== '0') {
    return res.status(403).json({ message: 'Admin access required.' });
  }
  next();
}




module.exports = { protect,authorizeAdmin };
