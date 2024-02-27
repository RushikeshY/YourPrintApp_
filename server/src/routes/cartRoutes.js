const express = require("express");
const {
  addToCart,
  getCartItems,
  deleteCartItem,
  updateQuantity,
  clearCart,
  // checkIfInCart
} = require("../controllers/cartController");
const router = express.Router();
const { protect } = require("../middleware/auth");

router.route("/addToCart").post(protect, addToCart);
router.route("/update/:productId").put(protect, updateQuantity);

router.route("/getAllItems").get(protect, getCartItems);
router.route("/remove/:id").delete(protect, deleteCartItem);
router.route("/clearcart").post(protect, clearCart);
// router.route("/check/:id").get(protect, checkIfInCart);
module.exports = router;
