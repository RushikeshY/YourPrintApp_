// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new mongoose.Schema({
    productTitle: {
        type: String,
        required: [true, 'Please enter the Product title'],
    },
    keywords: {
        type: [String],
        required: [
            true,
            'Please enter few keywords which are related to the product, so that this will help in product searching',
        ],
    },
    productDescription: {
        type: String,
        required: [true, 'Please enter the Product Description'],
    },
    colours: {
        type: Array,
    },
    // we can put as many as properties as key value pairs
    generalDetails: {
        type: Object, //{key:value}
    },
    sellingPrice: {
        type: Number,
        required: [true, 'Please enter the Actual Product Price'],
        max: [1e8 - 1, 'Price cannot exceed 8 characters'],
    },
    mrp: {
        type: Number,
        required: [true, 'Please enter the Actual Product Price'],
        max: [1e8 - 1, 'Price cannot exceed 8 characters'],
    },
    ratings: {
        type: Number,
        default: 0,
    },
    productImagesUrl: {
        type: [String],
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['male', 'female', 'kids', 'home decor', 'electronics', 'sports', 'books', 'fashion', 'beauty', 'others'],
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    stock: {
        type: Number,
        required: [true, 'Please Enter product Stock'],
        max: [9999, 'Stock cannot exceed 9999'],
        default: 1,
    },
    numOfNStar: {
        type: [Number],
        default: [0, 0, 0, 0, 0],
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model('Product', productSchema);
