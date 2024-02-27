const express = require('express');
const app = express()
const cors = require('cors')

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const cartRoutes = require('./routes/cartRoutes')
const addressRoutes = require('./routes/addressRoutes');
const orderRoutes = require("./routes/orderDetalilRoutes")
// Routes
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/address', addressRoutes);
app.use("/api/order",orderRoutes)

module.exports = app