// const Wishlist = require('../models/wishlistModels')
// const ErrorHandler = require('../utils/errorHandler')
// const catchAsyncErrors = require('../middleware/catchAsyncErrors')

// // Add a product to a user's wishlist:
// exports.addToWishlist = catchAsyncErrors(async (req, res, next) => {
//   const productId = req.body.productId;
//   const userId = req.user._id;

//   // Check if the product is already in the wishlist
//   const existingWishlistItem = await Wishlist.findOne({ userId, productId });

//   if (existingWishlistItem) {
//     return next(new ErrorHandler('Product is already in your wishlist', 400));
//   }

//   // If not, add the product to the wishlist
//   let wishlist;
//   try {
//     wishlist = await Wishlist.create({
//       userId,
//       productId,
//     });
//   } catch (err) {
//     if (err.code !== 11000) throw err;
//   }

//   res.status(201).json({
//     success: true,
//     wishlist,
//     message: 'Product added to your wishlist',
//   });
// });
// // Get a user's wishlist:-
// exports.getWishlist = catchAsyncErrors(async (req, res, next) => {
//   // Find wishlist items for the current user
//   const wishlist = await Wishlist.find({ userId: req.user._id })
//     .populate('productId') // Populate the productId field with the entire product data
//     .exec();

//   if (!wishlist || wishlist.length === 0) {
//     return next(new ErrorHandler('There are no products in the wishlist', 404));
//   }

//   res.status(200).json({
//     success: true,
//     wishlist
//   });
// });


// // Remove a product from a user's wishlist:
// exports.removeFromWishlist = catchAsyncErrors(async (req, res, next) => {
//   const productId = req.params.id
//   const userId = req.user._id

//   const wishlist = await Wishlist.findOneAndDelete({
//     productId,
//     userId
//   })

//   // console.log(wishlist)
//   if (wishlist === null) {
//     return next(
//       new ErrorHandler('Already Removed or Item does not exist', 400)
//     )
//   }

//   res.status(200).json({
//     success: true,
//     message: 'Product removed from your Wishlist'
//   })
// })




const Wishlist = require('../models/wishlistModels');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// Add a product to a user's wishlist:
exports.addToWishlist = catchAsyncErrors(async (req, res, next) => {
  const productId = req.body.productId;
  const userId = req.user._id;

  // Check if the product is already in the wishlist
  const existingWishlistItem = await Wishlist.findOne({ userId, productId });

  if (existingWishlistItem) {
    return res.status(400).json({
      success: false,
      message: 'Product is already in your wishlist',
    });
  }

  // If not, add the product to the wishlist
  let wishlist;
  try {
    wishlist = await Wishlist.create({
      userId,
      productId,
    });
  } catch (err) {
    if (err.code !== 11000) throw err;
  }

  res.status(201).json({
    success: true,
    wishlist,
    message: 'Product added to your wishlist',
  });
});

// Get a user's wishlist:
exports.getWishlist = catchAsyncErrors(async (req, res, next) => {
  // Find wishlist items for the current user
  const wishlist = await Wishlist.find({ userId: req.user._id })
    .populate('productId') // Populate the productId field with the entire product data
    .exec();

  if (!wishlist || wishlist.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'There are no products in the wishlist',
    });
  }

  res.status(200).json({
    success: true,
    wishlist,
  });
});

// Remove a product from a user's wishlist:
exports.removeFromWishlist = catchAsyncErrors(async (req, res, next) => {
  const productId = req.params.id;
  const userId = req.user._id;

  const wishlist = await Wishlist.findOneAndDelete({
    productId,
    userId,
  });

  if (!wishlist) {
    return res.status(400).json({
      success: false,
      message: 'Already Removed or Item does not exist',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Product removed from your Wishlist',
  });
});
