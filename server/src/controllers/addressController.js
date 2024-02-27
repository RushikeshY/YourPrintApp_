// controllers/addressController.js

const Address = require('../models/addressModel');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

exports.addAddress = catchAsyncErrors(async (req, res, next) => {
  const { name, email, mobileNumber, doorFlatNumber, firstLineAddress, secondLineAddress, city, state } = req.body;
  const userId = req.user._id;

  try {
    const newAddress = await Address.create({
      name,
      email,
      mobileNumber,
      doorFlatNumber,
      firstLineAddress,
      secondLineAddress,
      city,
      state,
      user: userId,
    });

    res.status(201).json({
      success: true,
      address: newAddress,
      message: 'Address added successfully',
    });
  } catch (error) {
    console.error('Error adding address:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});
exports.getAllAddresses = catchAsyncErrors(async (req, res, next) => {
    const userId = req.user._id;
  
    try {
      const addresses = await Address.find({ user: userId });
  
      res.status(200).json({
        success: true,
        addresses,
      });
    } catch (error) {
      console.error('Error fetching addresses:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });