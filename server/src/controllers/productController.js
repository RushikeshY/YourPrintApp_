// controllers/productController.js
const Product = require('../models/product');
// const faker = require('faker');
// Controller function to create a new product
async function createProduct(req, res) {
  const { productTitle, description, mrp } = req.body;
  // const userId = req.user._id;
  // console.log(userId,"eeeee")
  try {
    if (!productTitle || !mrp) {
      return res.status(400).json({ message: 'productTitle and mrp are required for creating a product.' });
    }

    const existingProduct = await Product.findOne({ productTitle });
    if (existingProduct) {
      return res.status(400).json({ message: 'Product with the same productTitle already exists.' });
    }

    // const product = new Product({ productTitle, description, mrp });
    // await product.save();
    req.body.userId = req.user.id
    // const { productImages } = req.files
    // const images = productImages.map((file) => ({
    //   data: file.buffer,
    //   contentType: file.mimetype,
    // }))
    const product = await Product.create({
      ...req.body,
      // productImages: images,
    })
    res.status(201).json({ message: 'Product created successfully.', product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Controller function to delete a product
async function deleteProduct(req, res) {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: 'Product deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Controller function to retrieve all products
// async function getProducts(req, res) {
//   try {
//     const products = await Product.find();
//     res.status(200).json(products);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// }// Backend: api/product/filter
// async function getFilteredProducts(req, res) {
//   try {
//     let query = {};
    
//     // If category filter is provided, add it to the query
//     if (req.query.category) {
//       query.category = req.query.category;
//     }
    
//     // If colors filter is provided, add it to the query
//     if (req.query.colors) {
//       query.colors = { $in: req.query.colors.split(",") };
//     }
    
//     // If price range filter is provided, add it to the query
//     if (req.query.minPrice || req.query.maxPrice) {
//       query.sellingPrice = {};
//       if (req.query.minPrice) {
//         query.sellingPrice.$gte = parseInt(req.query.minPrice);
//       }
//       if (req.query.maxPrice) {
//         query.sellingPrice.$lte = parseInt(req.query.maxPrice);
//       }
//     }
    
//     const products = await Product.find(query);
//     res.status(200).json(products);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// }
async function getFilteredProducts(req, res) {
  try {
    let query = {};
    
    // If category filter is provided, add it to the query
    if (req.query.category) {
      query.category = req.query.category;
    }
    
    // If price range filter is provided, add it to the query
    if (req.query.priceRange) {
      const priceRange = req.query.priceRange.split('-');
      const minPrice = parseInt(priceRange[0]);
      const maxPrice = parseInt(priceRange[1]);
      query.sellingPrice = { $gte: minPrice, $lte: maxPrice };
    }

    // If search query is provided, add it to the query
    if (req.query.searchQuery) {
      const regex = new RegExp(req.query.searchQuery, 'i'); // Case-insensitive search
      query.$or = [
        { productTitle: regex },
        { keywords: regex }
      ];
    }
    
    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { createProduct, deleteProduct, getFilteredProducts,getProductById };
