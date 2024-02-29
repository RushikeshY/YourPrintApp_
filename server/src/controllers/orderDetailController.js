// const Order = require('../models/orderDetailModel');
// const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// const nodemailer = require('nodemailer');

// // Assuming you have the necessary configurations for your email service

// exports.createOrder = catchAsyncErrors(async (req, res,next) => {
//   const { products, shippingAddress, totalPrice, orderStatus } = req.body;
//   const userId = req.user.id; // Assuming user ID is stored in req.user after authentication

//   try {
//     const order = await Order.create({
//       user: userId,
//       products,
//       shippingAddress,
//       totalPrice,
//       orderStatus,
//       // Add other fields as needed
//     });

// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: process.env.EMAIL, // Access email from environment variable
//     pass: process.env.PASSWORD, // Access password from environment variable
//   },
// });

//     const mailOptions = {
//         from: "your_email@gmail.com", // Sender email address
//         to: email,
//         subject: "Invoice Of Placed Order",
//         html: `
//           <html>
//             <head>
//               <style>
//                 /* Add your custom CSS styles here */
//                 body {
//                   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//                   background-color: #f2f2f2;
//                   margin: 0;
//                   padding: 0;
//                 }
//                 .container {
//                   max-width: 600px;
//                   height:370px;
//                   margin: 0 auto;
//                   padding: 20px;
//                   background: #F5F7F8;
//                   border-radius: 10px;
//                   box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
//                   color: #191717;
//                 }
//                 .logo img {
//                   display: block;
//                   margin: 0 auto;
//                   width: 220px;
//                   margin-bottom: 10px;
//                   margin-top: 15px;
//                 }
//                 .otp {
//                   font-size: 24px;
//                   font-weight: bold;
//                   text-align: center;
//                   margin-bottom: 5px;
//                 }
//                 .message {
//                   text-align: center;
//                   margin-bottom: 10px;
//                   margin-top:20px;
//                   font-size: 15px;
//                   color:#000000;
//                 }
//                 .random-image {
//                   broder-radius:30%;
//                   box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
//                 }
//               </style>
//             </head>
//             <body>
//               <div class="container">
//                 <div class="logo">
//                   <img src="https://img.freepik.com/free-vector/phishing-account-concept_23-2148534567.jpg?size=626&ext=jpg&ga=GA1.1.1753974422.1707818740&semt=ais" alt="Random Image" class="random-image">
//                 </div>
//                 <div class="message">
//                   Thank you for placing order. Your order will delivered soon.
//                 </div>
//                 <div class="otp">

//                 </div>
//               </div>
//             </body>
//           </html>
//     `,
//       };

//       await transporter.sendMail(mailOptions);
//     res.status(201).json({
//       success: true,
//       order,
//       message: 'Order placed successfully',
//     });
//   } catch (error) {
//     console.error('Error placing order:', error);
//     res.status(500).json({ success: false, message: 'Internal Server Error' });
//   }
// // });
// const Order = require('../models/orderDetailModel');
// const catchAsyncErrors = require('../middleware/catchAsyncErrors');
// const nodemailer = require('nodemailer');
// const User = require('../models/User');

// exports.createOrder = catchAsyncErrors(async (req, res, next) => {
//   const {products, shippingAddress, totalPrice, orderStatus } = req.body;
//   const userId = req.user.id;

//   try {
//     const user = await User.findById(userId);
//     const userEmail = user.email;

//     // const userProducts = await YourProductModel.find({ userId: userId });

//     const order = await Order.create({
//       user: userId,
//       products: products,
//       shippingAddress,
//       totalPrice,
//       orderStatus,
//     });

//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'rushikeshyerme1234@gmail.com',
//         pass: 'xoog wzyb kugn vrts',
//       },
//     });

//     const mailOptions = {
//       from: 'your_email@gmail.com',
//       to: userEmail,
//       subject: 'Invoice Of Placed Order',
//       html: generateInvoiceHtml(order),
//     };

//     await transporter.sendMail(mailOptions);

//     res.status(201).json({
//       success: true,
//       order,
//       message: 'Order placed successfully',
//     });
//   } catch (error) {
//     console.error('Error placing order:', error);
//     res.status(500).json({ success: false, message: 'Internal Server Error' });
//   }
// });

// const generateInvoiceHtml = (order) => {
//   const productsHtml = order.products.map((product) => `
//     <tr>
//       <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">
//         <img src="${product.imageUrl}" alt="${product.name}" style="max-width: 100%; height: auto;">
//       </td>
//       <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">${product.name}</td>
//       <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">${product.price}</td>
//       <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">${product.quantity}</td>
//       <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">${product.price * product.quantity}</td>
//     </tr>
//   `).join('');

//   return `
//     <html>
//       <head>
//         <style>
//           body {
//             font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//             background-color: #f2f2f2;
//             margin: 0;
//             padding: 0;
//           }
//           .container {
//             max-width: 600px;
//             margin: 0 auto;
//             padding: 20px;
//             background: #F5F7F8;
//             border-radius: 10px;
//             box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
//             color: #191717;
//           }
//           .logo img {
//             display: block;
//             margin: 0 auto;
//             width: 220px;
//             margin-bottom: 10px;
//             margin-top: 15px;
//           }
//           .invoice-table {
//             width: 100%;
//             border-collapse: collapse;
//             margin-top: 20px;
//           }
//           .invoice-table th, .invoice-table td {
//             border: 1px solid #ddd;
//             padding: 15px;
//             text-align: left;
//           }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <div class="logo">
//             <img src="https://your-logo-url.com" alt="Your Logo" style="max-width: 100%;">
//           </div>
//           <h2>Invoice for Order #${order._id}</h2>
//           <table class="invoice-table">
//             <thead>
//               <tr>
//                 <th>Product Image</th>
//                 <th>Product Name</th>
//                 <th>Price</th>
//                 <th>Quantity</th>
//                 <th>Total</th>
//               </tr>
//             </thead>
//             <tbody>
//               ${productsHtml}
//             </tbody>
//           </table>
//           <p>Total Price: ${order.totalPrice}</p>
//           <p>Thank you for placing an order. Your order will be delivered soon.</p>
//         </div>
//       </body>
//     </html>
//   `;
// };

const Order = require("../models/orderDetailModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const Product = require("../models/product"); // Replace 'Product' with your actual product model

exports.createOrder = catchAsyncErrors(async (req, res, next) => {
  const { products, shippingAddress, totalPrice, orderStatus } = req.body;
  const userId = req.user.id;
  console.log(products);
  try {
    const user = await User.findById(userId);
    const userEmail = user.email;

    // const productDetails = await getProductDetails(products);
    // let productsDetails = [];

    // for (let i = 0; i < products.length; i++) {
    //   let id = products[i].id;
    //   console.log(id);

    //   let product1 = await Product.findById(id);
    //   console.log(product1);

    //   productsDetails.push(product1);

    // }

    // console.log(productDetails)

    // const order = await Order.create({
    //   user: userId,
    //   products,
    //   shippingAddress,
    //   totalPrice,
    //   orderStatus,
    // });

    // const populatedProducts = await Promise.all(
    //   products.map(async (product) => {
    //     const productDetails = await Product.findById(product.product);
    //     return {
    //       ...productDetails.toObject(),
    //       quantity: product.quantity,
    //     };
    //   })
    // );
    // console.log(populatedProducts)

    //Assuming product IDs are stored in the 'id' property of each orderedProduct
    const productIds = products.map((orderedProduct) => orderedProduct.id);

    // Fetch detailed product information using populate
    const populatedProducts = await Product.find({ _id: { $in: productIds } });

    // Combine product details with ordered quantity
    const orderedProductsDetails = populatedProducts.map((product) => {
      const orderedProduct = products.find(
        (p) => p.id === product._id.toString()
      ); // Use toString() to compare ObjectId
      return {
        ...product.toObject(),
        quantity: orderedProduct.quantity,
      };
    });

    console.log(orderedProductsDetails);

    const newOrder = new Order({
      user: userId,
      products,
      shippingAddress,
      totalPrice,
      orderStatus,
    });

    await newOrder.save();
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL, // Access email from environment variable
        pass: process.env.PASSWORD, // Access password from environment variable
      },
    });

    const mailOptions = {
      from: "your_email@gmail.com",
      to: userEmail,
      subject: "Invoice Of Placed Order",
      html: generateInvoiceHtml(orderedProductsDetails, newOrder),
    };

    await transporter.sendMail(mailOptions);

    // Generate HTML invoice with populated products
    // const invoiceHtml =

    res.status(201).json({
      success: true,
      newOrder,
      message: "Order placed successfully",
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// const getProductDetails = async (products) => {
//   const productDetails = [];
//   for (const product of products) {
//     const productDetail = await Product.findById(product.productId);

//     console.log(productDetail)

//     if (productDetail) {
//       productDetails.push({
//         productId: productDetail._id,
//         name: productDetail.productTitle,
//         price: productDetail.mrp,
//         quantity: product.quantity,
//         imageUrl: productDetail.imageUrl,
//       });
//     }
//   }
//   return productDetails;
// };

const generateInvoiceHtml = (orderedProductsDetails, order) => {
  const productsHtml = orderedProductsDetails
    .map(
      (product) => `
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">
        <img style="width:200px" src="https://img.freepik.com/free-photo/wooden-shelf-tropical-forest-product-presentation-dark-green-background_41470-5139.jpg?w=900&t=st=1709188542~exp=1709189142~hmac=ce75e0364b70858fad4cf7722eb1a9ca9965c6c3b0e854a06693bcb2affa6844" alt="${
          product.productTitle
        }" style="max-width: 100%; height: auto;">
      </td>
      <td style="padding: 10px; border: 1px solid #ddd;font-weight:bold;  text-align: center;"> ${
        product.productTitle
      }</td>
      <td style="padding: 10px; border: 1px solid #ddd;font-weight:bold; text-align: center;">₹${
        product.mrp
      }</td>
      <td style="padding: 10px; border: 1px solid #ddd; font-weight:bold; text-align: center;">${
        product.quantity
      }</td>
      <td style="padding: 10px; border: 1px solid #ddd; font-weight:bold;  text-align: center;"₹${
        product.mrp * product.quantity
      }</td>
    </tr>
  `
    )
    .join("");

  return `
    <html>
      <head>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f2f2f2;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background: #F5F7F8;
            border-radius: 10px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
            color: #191717;
          }
          .logo img {
            display: block;
            margin: 0 auto;
            width: 220px;
            margin-bottom: 10px;
            margin-top: 15px;
          }
          .invoice-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          .invoice-table th, .invoice-table td {
            border: 1px solid #ddd;
            padding: 15px;
            text-align: left;
          }
        </style>
      </head>
      <body>
        <div class="container">
        <h3 style="text-align:center">Thank you for placing an order. Your order will be delivered soon.</h3>

          <h2 style="text-align:center">Invoice for Order #${order._id}</h2>
          <table class="invoice-table">
            <thead>
              <tr>
                <th>Product Image</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${productsHtml}
            </tbody>
          </table>
          <p>Total Price: ${order.totalPrice}</p>
        </div>
      </body>
    </html>
  `;
};
