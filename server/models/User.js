const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  mobile: String,
  gender: String,
  state: String,
  pincode: String,

  isVerified: { type: Boolean, default: false },
  otp: String
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);