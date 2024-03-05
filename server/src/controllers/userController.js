// controllers/userController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const cookie = require("cookie");

const config = require("../config/config");
const User = require("../models/User");

async function register(req, res) {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function sendOTP(req, res) {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 600000; // 10 minutes
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL, // Access email from environment variable
        pass: process.env.PASSWORD, // Access password from environment variable
      },
    });

    const mailOptions = {
      from: "your_email@gmail.com", // Sender email address
      to: email,
      subject: "OTP Verification",
      html: `
        <html>
          <head>
            <style>
              /* Add your custom CSS styles here */
              body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f2f2f2;
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 600px;
                height:370px;
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
              .otp {
                font-size: 24px;
                font-weight: bold;
                text-align: center;
                margin-bottom: 5px;
              }
              .message {
                text-align: center;
                margin-bottom: 10px;
                margin-top:20px;
                font-size: 15px;
                color:#000000;
              }
              .random-image {
                broder-radius:30%;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="logo">
                <img src="https://img.freepik.com/free-vector/phishing-account-concept_23-2148534567.jpg?size=626&ext=jpg&ga=GA1.1.1753974422.1707818740&semt=ais" alt="Random Image" class="random-image">
              </div>
              <div class="message">
                Please use this OTP to login your account on YourPrint.
              </div>
              <div class="otp">
                Your OTP is: ${otp}               
              </div>
            </div>
          </body>
        </html>
  `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "OTP sent successfully." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function verifyOTP(req, res) {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.otp !== otp) {
      return res.status(401).json({ message: "Invalid OTP." });
    }

    if (user.otpExpires < Date.now()) {
      return res.status(401).json({ message: "OTP has expired." });
    }

    // Clear OTP data after successful verification
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ message: "OTP verified successfully." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function login(req, res) {
  const { email, password, otp } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    let user;

    
    if (password) {
      // Email/password based login
      if (!password) {
        return res.status(400).json({ message: "Password is required." });
      }
      user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password." });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: "Invalid email or password." });
      }
    } else if (otp) {
      // Email/OTP based login
      if (!otp) {
        return res.status(400).json({ message: "OTP is required." });
      }

      user = await User.findOne({ email, otp });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or OTP." });
      }

      if (user.otpExpires < Date.now()) {
        return res.status(401).json({ message: "OTP has expired." });
      }
      // Clear OTP data after successful OTP-based login
      user.otp = null;
      user.otpExpires = null;
      await user.save();
    } else {
      return res
        .status(400)
        .json({ message: "Either password or OTP is required." });
    }

    // Generate JWT token
    // const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, config.jwtSecret, { expiresIn: '1h' });
    // res.status(200).json({ token });
    // Generate JWT token
    const token = generateToken(user._id, user.email, user.role);

    // Store token in cookie
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        maxAge: 3600, // Expires in 1 hour (adjust as needed)
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production", // Set to true in production
      })
    );

    res.status(200).json({
      message: "Login successful",
      user: user.email,
      _id: user.id,
      name: user.name,
      token: token,
    });
    // res
    //   .status(200)
    //   .json({
    //     message: "Login successful",
    //     user: user.email,
    //     _id: user.id,
    //     name: user.name,
    //     token: generateToken(user._id, user.email, user.role),
    //   });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

logoutUser = async (req, res) => {
  await res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { register, login, sendOTP, verifyOTP, logoutUser };
