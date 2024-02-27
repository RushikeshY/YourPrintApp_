// routes/addressRoutes.js

const express = require('express');
const router = express.Router();
const {addAddress, getAllAddresses} = require('../controllers/addressController');
const { protect } = require("../middleware/auth");
// router.post('/add',protect, addAddress);
router.route("/add").post(protect, addAddress);
router.route("/getaddresses").get(protect,getAllAddresses)
module.exports = router;
