const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const Cart = require('../models/cartModel')

exports.addToCart = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;
  

  let cartItem = await Cart.findOne({ userId, productId });

  console.log(cartItem)
  if (cartItem) {
    return res.status(400).json({
      success: false,
      message: 'Item is already in the cart. Use update endpoint to change the quantity.',
    });
  }

  if (quantity < 1) {
    return res.status(400).json({
      success: false,
      message: 'Quantity must be greater than or equal to 1 when adding to cart.',
    });
  }

  cartItem = new Cart({ userId, productId, quantity });
  await cartItem.save();

  res.status(201).json({
    success: true,
    cartItem,
    message: 'Item added to cart',
  });
});

// get all the cart items for a specific user

exports.getCartItems = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;

  // Fetch cart items and populate product details
  const cartItems = await Cart.find({ userId }).populate('productId');

  if (!cartItems) {
    return next(new ErrorHandler('No Item Added Yet', 404));
  }

  res.status(200).json({
    success: true,
    cartItems,
  });
});

// Remove an item from cart
exports.deleteCartItem = catchAsyncErrors(async (req, res, next) => {
  const cartItemId = req.params.id
  console.log(req.params.id)

  const removedCartItem = await Cart.findByIdAndDelete(cartItemId)
 console.log(removedCartItem,"wwww")
  

  if (!removedCartItem) {
    return next(new ErrorHandler('Cart item not found', 404))
  }

  res.status(200).json({
    success: true,
    message: 'Cart item removed successfully',
  })
})

exports.updateQuantity = async (req, res, next) => {
  const newQuantity = req.body.quantity;
  const cartItemId = req.params.productId;
  console.log(cartItemId)

  if (newQuantity < 1) {
    return next(new ErrorHandler('Quantity must be greater than or equal to 1.', 400));
  }

  try {
    // Find the cart item by its _id
    const cartItem = await Cart.findById(cartItemId);

    if (!cartItem) {
      return next(new ErrorHandler('Cart item not found.', 404));
    }

    // Update the quantity of the found cart item
    cartItem.quantity = newQuantity;
    await cartItem.save();

    res.status(200).json({
      success: true,
      cartItem,
      message: 'Quantity updated successfully.',
    });
  } catch (error) {
    next(error);
  }
};


// server/controllers/cartController.js

exports.clearCart = async (req, res,next) => {
  try {
    const userId = req.user.id;

    // Remove items from the cart for the user
    // await Cart.findAndDelete({ userId });
    await Cart.deleteMany({ userId });
    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// exports.checkIfInCart = async (req, res, next) => {
//   try {
//     const userId = req.user._id;
//     const productId = req.params.productId;

//     const cartItem = await Cart.findOne({ userId, productId });

//     res.status(200).json({
//       success: true,
//       isInCart: !!cartItem, // Convert to boolean for clarity
//     });
//   } catch (error) {
//     next(error);
//   }
// };


// const ErrorHandler = require('../utils/errorHandler');
// const catchAsyncErrors = require('../middleware/catchAsyncErrors');
// const Cart = require('../models/cartModel');

// exports.addToCart = catchAsyncErrors(async (req, res, next) => {
//   const userId = req.user._id;
//   const { productId, quantity } = req.body;

//   let cartItem = await Cart.findOne({ userId, productId });

//   console.log(cartItem);

//   if (cartItem) {
//     return res.status(400).json({
//       success: false,
//       message: 'Item is already in the cart.',
//     });
//   }

//   if (quantity < 1) {
//     return res.status(400).json({
//       success: false,
//       message: 'Quantity must be greater than or equal to 1 when adding to the cart.',
//     });
//   }

//   cartItem = new Cart({ userId, productId, quantity });
//   await cartItem.save();

//   res.status(201).json({
//     success: true,
//     cartItem,
//     message: 'Item added to the cart.',
//   });
// });

// // Get all cart items for a specific user
// exports.getCartItems = catchAsyncErrors(async (req, res, next) => {
//   const userId = req.user._id;

//   // Fetch cart items and populate product details
//   const cartItems = await Cart.find({ userId }).populate('productId');

//   if (!cartItems || cartItems.length === 0) {
//     return next(new ErrorHandler('No items added to the cart yet.', 404));
//   }

//   res.status(200).json({
//     success: true,
//     cartItems,
//   });
// });

// // Remove an item from the cart
// exports.deleteCartItem = catchAsyncErrors(async (req, res, next) => {
//   const cartItemId = req.params.id;

//   const removedCartItem = await Cart.findByIdAndDelete(cartItemId);

//   console.log(removedCartItem, "wwww");

//   if (!removedCartItem) {
//     return next(new ErrorHandler('Cart item not found.', 404));
//   }

//   res.status(200).json({
//     success: true,
//     message: 'Cart item removed successfully.',
//   });
// });

// exports.updateQuantity = catchAsyncErrors(async (req, res, next) => {
//   const newQuantity = req.body.quantity;
//   const cartItemId = req.params.id;

//   if (newQuantity < 1) {
//     return next(new ErrorHandler('Quantity must be greater than or equal to 1.', 400));
//   }

//   try {
//     const cartItem = await Cart.findOneAndUpdate(
//       { _id: cartItemId },
//       { quantity: newQuantity },
//       { new: true } // Return the updated document
//     );

//     if (!cartItem) {
//       return next(new ErrorHandler('Cart item not found.', 404));
//     }

//     res.status(200).json({
//       success: true,
//       cartItem,
//       message: 'Quantity updated successfully.',
//     });
//   } catch (error) {
//     next(error);
//   }
// });

