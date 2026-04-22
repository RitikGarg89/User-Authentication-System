const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, mobile, gender, state, pincode } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      mobile,
      gender,
      state,
      pincode,
      otp
    });

    await user.save();

    // 👉 send email
    await sendEmail(email, otp);

    res.json({
      message: "OTP sent to your email 📧"
    });

  } catch (err) {
    console.log(err);
    res.json({ message: "Error" });
  }
});

router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: "User not found" });
    }

    if (user.otp == otp) {
      user.isVerified = true;
      user.otp = null;
      await user.save();

      return res.json({ message: "Account verified ✅" });
    } else {
      return res.json({ message: "Invalid OTP ❌" });
    }

  } catch (error) {
    console.log(error);
    res.json({ message: "Error" });
  }
});

const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: "User not found" });
    }

    if (!user.isVerified) {
      return res.json({ message: "Please verify OTP first" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    );

    res.json({
      message: "Login successful ✅",
      token
    });

  } catch (error) {
    console.log(error);
    res.json({ message: "Error" });
  }
});

const authMiddleware = require("../middleware/authMiddleware");

router.get("/dashboard", authMiddleware, async (req, res) => {
  res.json({
    message: "Welcome to dashboard 🎉",
    userId: req.user.id
  });
});

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -otp");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;