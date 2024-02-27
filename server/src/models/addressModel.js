// models/Address.js

const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  doorFlatNumber: { type: String, required: true },
  firstLineAddress: { type: String, required: true },
  secondLineAddress: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, {
    versionKey: false,
    timestamps: true
  });

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
