const express = require('express')
const {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  getSingleProductFromWishlist
} = require('../controllers/wishlistController')
const router = express.Router()
const { protect } = require('../middleware/auth')

router.route('/add').post(protect, addToWishlist)
router.route('/getall').get(protect, getWishlist)
router.route('/:id').delete(protect, removeFromWishlist)
// router.route('/:id').get(protect, getSingleProductFromWishlist)
module.exports = router
