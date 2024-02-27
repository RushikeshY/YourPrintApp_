const express = require('express');
const router = express.Router();

const {createOrder} = require('../controllers/orderDetailController');
const { protect } = require("../middleware/auth");
router.route('/orderdetails/add').post(protect,createOrder) ;

module.exports = router;