// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/auth');

router.get('/getall', productController.getFilteredProducts);
router.post('/create', authMiddleware.protect, authMiddleware.authorizeAdmin, productController.createProduct);
router.delete('/:productId', authMiddleware.protect, authMiddleware.authorizeAdmin, productController.deleteProduct);
router.get('/:id', productController.getProductById);
module.exports = router;